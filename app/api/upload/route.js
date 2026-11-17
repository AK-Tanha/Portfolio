import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';
import { requireAdmin } from '@/lib/guard';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'];

const SAFE_NAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

// The blob pathname is chosen by the client and cannot be rewritten server-side,
// so reject anything that isn't a bare filename (no separators, no traversal).
function validatePathname(pathname) {
  return typeof pathname === 'string' && pathname.length > 0 && pathname.length <= 120 && SAFE_NAME.test(pathname);
}

export async function POST(request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image uploads are not configured. Add BLOB_READ_WRITE_TOKEN to your environment.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const pathname = body?.payload?.pathname;
  if (body?.type === 'blob.generate-client-token' && !validatePathname(pathname)) {
    return NextResponse.json(
      { error: 'Invalid file name. Use letters, numbers, dots, dashes or underscores.' },
      { status: 400 }
    );
  }

  const result = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async (pathname) => ({
      allowedContentTypes: ALLOWED_TYPES,
      maximumSizeInBytes: MAX_FILE_SIZE,
      addRandomSuffix: true,
    }),
  });

  return NextResponse.json(result);
}