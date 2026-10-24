// NotAraxx Music - Cloudflare Worker
// Serves the static site from ./public and adds security headers.
// The AI composer itself runs inside the visitor's browser (public/index.html).

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only GET/HEAD make sense for a static site
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    // Simple health check
    if (url.pathname === "/health") {
      return Response.json({ ok: true, name: "NotAraxx Music" });
    }

    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    if (url.pathname === "/" || url.pathname.endsWith(".html")) {
      headers.set("Cache-Control", "public, max-age=300");
    }

    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
