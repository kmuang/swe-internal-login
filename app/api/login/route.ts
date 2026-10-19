import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit valid form data." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ message: "Please submit valid form data." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  const password = typeof fields.password === "string" ? fields.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please enter your email and password." },
      { status: 400 }
    );
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address and password." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    user: {
      name: email.split("@")[0].replace(/[._-]+/g, " "),
      email
    }
  });
}
