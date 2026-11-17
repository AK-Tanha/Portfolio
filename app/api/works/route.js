import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/guard';
import { parseWorkInput } from '@/lib/validate';
import { createWork, getAllWorks } from '@/lib/works';

export async function GET() {
  const works = await getAllWorks();
  return NextResponse.json({ works });
}

export async function POST(request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { data, errors } = parseWorkInput(body);
  if (errors) {
    return NextResponse.json({ error: 'Validation failed.', errors }, { status: 422 });
  }

  try {
    const work = await createWork(data);
    return NextResponse.json({ work }, { status: 201 });
  } catch (error) {
    console.error('[api/works] create failed:', error);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}