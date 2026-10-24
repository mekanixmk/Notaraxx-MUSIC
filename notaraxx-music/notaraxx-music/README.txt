NotAraxx Music - deploy guide

Folder layout
  wrangler.toml      Cloudflare config (worker name: "music")
  index.js           Worker that serves the site
  public/index.html  The website and the AI music composer
  public/robots.txt
  public/sitemap.xml
  public/favicon.svg

Deploy (needs Node.js installed once)
  1. Open a terminal inside this folder
  2. npx wrangler login
  3. npx wrangler deploy
  Your site goes live at https://music.<your-account>.workers.dev

Before you go live
  - In public/sitemap.xml, public/robots.txt and the canonical/og:url tags in
    public/index.html, replace music.notaraxxdevelopment.workers.dev with your real URL.
  - Optional: set GOOGLE_CLIENT_ID near the top of the script in public/index.html
    to enable real Google sign-in.
