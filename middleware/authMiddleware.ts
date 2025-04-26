import { NextResponse } from "next/server";
import { PUBLIC_PATHS } from "./publicPaths";

export function handleAuthMiddleware(req: Request & { nextUrl: URL }) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next(); // fallback
}
