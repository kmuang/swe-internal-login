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
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  const password = typeof fields.password === "string" ? fields.password : "";
  const confirmPassword =
    typeof fields.confirmPassword === "string" ? fields.confirmPassword : "";

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Please fill in every required field." },
      { status: 400 }
    );
  }

  if (name.length > 100) {
    return NextResponse.json(
      { message: "Name must be 100 characters or fewer." },
      { status: 400 }
    );
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters and no more than 72 bytes." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match." },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: { name, email } });
}
