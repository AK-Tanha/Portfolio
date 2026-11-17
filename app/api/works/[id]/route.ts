import { NextResponse } from 'next/server';
import { del as deleteBlob } from '@vercel/blob';
import { requireAdmin } from '@/lib/guard';
import { parseWorkInput } from '@/lib/validate';
import { deleteWork, findWorkById, updateWork } from '@/lib/works';

async function removeBlob(url) {
  if (!url) return;
  try {
    await deleteBlob(url);
  } catch (error) {
    console.error('[api/works] blob delete failed:', error.message);
  }
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const work = await findWorkById(id);
  if (!work) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  return NextResponse.json({ work });
}

export async function PATCH(request, { params }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const existing = await findWorkById(id);
    if (!existing) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });

    // Merge over the stored doc so a partial payload validates as a whole.
    const { data, errors } = parseWorkInput({ ...existing, ...body });
    if (errors) {
      return NextResponse.json({ error: 'Validation failed.', errors }, { status: 422 });
    }

    const updated = await updateWork(id, data);

    if (existing.blobUrl && existing.blobUrl !== data.blobUrl) {
      await removeBlob(existing.blobUrl);
    }

    return NextResponse.json({ work: updated });
  } catch (error) {
    console.error('[api/works] update failed:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const existing = await findWorkById(id);
    if (!existing) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });

    await deleteWork(id);
    if (existing.blobUrl) await removeBlob(existing.blobUrl);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[api/works] delete failed:', error);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}