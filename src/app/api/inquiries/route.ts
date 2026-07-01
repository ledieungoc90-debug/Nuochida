import { NextResponse } from "next/server";

type InquiryBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  product?: string;
  visited_products?: string[];
  message?: string;
  page_url?: string;
};

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryBody;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  const payload = {
    name,
    email,
    phone: body.phone?.trim() || "",
    company: body.company?.trim() || "",
    product: body.product || "",
    visited_products: Array.isArray(body.visited_products) ? body.visited_products : [],
    message,
    page_url: body.page_url || "",
    status: "new",
  };

  if (!DIRECTUS_URL || !DIRECTUS_STATIC_TOKEN) {
    return NextResponse.json({ ok: true, stored: false, payload }, { status: 202 });
  }

  const response = await fetch(`${DIRECTUS_URL}/items/inquiries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DIRECTUS_STATIC_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "Directus inquiry write failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
