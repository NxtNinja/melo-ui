// /app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieToken = (await cookies()).get("directus_session_token")?.value;

  if (!cookieToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const { iss } = decodeJwt(cookieToken);
    if (iss === "directus") {
      return NextResponse.json({ isAuthenticated: true });
    }
  } catch (e) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json({ isAuthenticated: false }, { status: 401 });
}
