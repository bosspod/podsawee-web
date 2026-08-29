import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
  const host = forwardedHost ?? request.headers.get("host") ?? request.nextUrl.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol ?? request.nextUrl.protocol.replace(":", "");
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const canonicalHost = host === "www.podsawee.com" ? "podsawee.com" : host;

  if (!isLocal && (protocol === "http" || canonicalHost !== host)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = canonicalHost.split(":")[0];
    destination.port = "";
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
