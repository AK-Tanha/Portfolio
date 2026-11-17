export const SESSION_COOKIE = 'portfolio_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

const getSecret = async () => {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error('SESSION_SECRET must be set to a random string of at least 32 characters.');
  }
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(value),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
};

const toBase64Url = (bytes) => {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value) => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const constantTimeEquals = async (key, signature, message) => {
  // `verify` needs the raw signature bytes, not the base64url text.
  const ok = await crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64Url(signature),
    encoder.encode(message)
  );
  return ok;
};

export async function verifyCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;

  const emailOk =
    String(email || '').trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordOk = String(password || '') === adminPassword;
  return emailOk && passwordOk;
}

export async function createSessionToken() {
  const key = await getSecret();
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        email: process.env.ADMIN_EMAIL,
        exp: Date.now() + SESSION_TTL_SECONDS * 1000,
      })
    )
  );
  const signature = toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload))));
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;

  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  let key;
  try {
    key = await getSecret();
  } catch {
    return false;
  }

  // Both halves are attacker-controlled: `fromBase64Url` calls `atob`, which
  // throws InvalidCharacterError on malformed input. Treat a corrupt cookie as
  // an invalid session rather than letting it bubble up into a 500.
  let parsed;
  try {
    if (!(await constantTimeEquals(key, signature, payload))) return false;
    const json = new TextDecoder().decode(fromBase64Url(payload));
    parsed = JSON.parse(json);
  } catch {
    return false;
  }

  if (typeof parsed.exp !== 'number' || parsed.exp < Date.now()) return false;
  return parsed.email === process.env.ADMIN_EMAIL;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}