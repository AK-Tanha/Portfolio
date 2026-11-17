import 'server-only';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './auth';

export async function requireAdmin(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}