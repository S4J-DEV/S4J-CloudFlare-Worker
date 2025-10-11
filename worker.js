// Made by S4J-DEV (https://github.com/S4J-DEV/S4J-CloudFlare-Worker/)
// LICENSE: https://github.com/S4J-DEV/S4J-CloudFlare-Worker/blob/main/LICENSE.md

export default {
  async fetch(req) {
    const dest = "https://status.searchforjohn.com";
    const ua = req.headers.get("user-agent") || "";
    const isBounceUA = /\bbounceme\b/i.test(ua);
    const res = await fetch(req);
    if ( res.status === 502 || res.status === 521 || res.status === 523 || isBounceUA ) {
      const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0; url=${dest}" />
  <!-- LICENSE: https://github.com/S4J-DEV/S4J-CloudFlare-Worker/blob/main/LICENSE.md -->
  <style>
    :root { color-scheme: dark; }
    html, body { height: 100%; }
    body {
      margin: 0;
      background: #222428;
      color: #bbb;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial;
    }
    .wrap { box-sizing: border-box; width: 100%; padding: 6vh 8vw; }
    .msg {
      font-weight: 700;
      line-height: 1.25;
      font-size: clamp(1.75rem, 5vw, 4rem);
      margin: 0 auto;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    a { color: #bbb; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="msg">
      The S4J server is currently having issues.<br>
      We’re redirecting you to the server status page
      <a href="${dest}" rel="noopener noreferrer">${dest}</a>.
    </p>
    <noscript>
      <p style="margin-top:1rem">
        JavaScript is disabled. If you are not redirected automatically, use the link above.
      </p>
    </noscript>
  </div>
</body>
</html>`;
      return new Response(html, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store, max-age=0",
          "pragma": "no-cache",
        },
      });
    }
    return res;
  },
};
