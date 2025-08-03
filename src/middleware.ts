import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const hostname = req.headers.get("host")!;
  const subdomain = hostname.match(/^([^.]+)\./)?.[1] || "";
  const url = req.nextUrl;

  // Handle hack subdomain
  if (subdomain === "hack") {
    // First, check if we need to handle i18n redirect
    if (!url.pathname.match(/^\/[a-zA-Z]{2}($|\/)/)) {
      const locale = routing.defaultLocale;
      const redirectUrl = new URL(req.url);
      redirectUrl.pathname = `/${locale}`;
      return NextResponse.redirect(redirectUrl);
    }

    // For paths with locale, rewrite to the hack path
    const pathname = url.pathname;
    if (!pathname.includes("/hack/")) {
      // Handle the i18n response first
      const i18nResponse = await handleI18nRouting(req);

      // Then rewrite to the hack path internally while keeping the visible URL clean
      const rewrittenUrl = new URL(req.url);
      rewrittenUrl.pathname = `/hack${pathname}`;
      return NextResponse.rewrite(rewrittenUrl, {
        headers: i18nResponse.headers,
      });
    }
  }

  // For all other cases, apply i18n routing
  return handleI18nRouting(req);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
