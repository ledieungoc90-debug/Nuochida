import { NextRequest, NextResponse } from "next/server";

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;
const FILE_ID_PATTERN = /^[a-zA-Z0-9_-]{8,}$/;

function allowedParam(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  return value && /^[a-zA-Z0-9_-]+$/.test(value) ? value : null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<unknown> }
) {
  const params = (await context.params) as { id?: string };
  const id = params.id || "";

  if (!DIRECTUS_URL || !DIRECTUS_STATIC_TOKEN || !FILE_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "asset not available" }, { status: 404 });
  }

  const requestUrl = new URL(request.url);
  const assetUrl = new URL(`/assets/${id}`, DIRECTUS_URL);
  for (const key of ["width", "quality", "format"]) {
    const value = allowedParam(requestUrl.searchParams, key);
    if (value) assetUrl.searchParams.set(key, value);
  }

  const response = await fetch(assetUrl, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}`,
    },
  });

  if (!response.ok || !response.body) {
    return NextResponse.json({ error: "asset fetch failed" }, { status: 502 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
