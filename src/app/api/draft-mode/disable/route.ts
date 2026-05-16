import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { draftModeCorsHeaders, draftModeOptionsResponse } from '../cors';

export const OPTIONS = draftModeOptionsResponse;

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL('/', request.url), {
    headers: draftModeCorsHeaders(request),
  });
}
