import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Successfully!" });

  res.cookies.delete("blog-token");

  res.cookies.delete("blog-refresh-token");

  return res;
}
