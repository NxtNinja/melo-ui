"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Cookie {
  access_token: string;
  refresh_token: string;
}

export async function create(data: Cookie) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "access_token",
    value: data.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  cookieStore.set({
    name: "refresh_token",
    value: data.refresh_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function get() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("access_token");

  if (cookie === undefined) {
    redirect("/login");
  }

  return cookie;
}
