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
  <!-- LICENSE: https://github.com/S4J-DEV/S4J-CloudFlare-Worker/blob/main/LICENSE.md -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <title>Redirecting…</title>
  <style>
    :root { color-scheme: dark; }
    html, body { height: 100%; }
    body {
      margin: 0;
      background: #222428;
      color: #bbb;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      padding: 2rem;
    }
    a { color: #bbb; text-decoration: underline; }
    .box {
      max-width: 52rem; line-height: 1.5;
      font-size: clamp(1rem, 2.5vw + 0.5rem, 1.35rem);
    }
    noscript { display: block; margin-top: 1rem; width: 100%; }
  </style>
</head>
<body>
  <div class="box">
    The S4J server is currently having issues or restarting.
    <br>
    We are working to fix it.
  </div>
  <script>
    (function () {
      var m = new Date().getMinutes();
      var nearTop = (m <= 3); // XX:00, XX:01, XX:02, XX:03
      if (nearTop) {
        setTimeout(function () { location.reload(); }, 2000);
      } else {
        var dest = ${JSON.stringify(dest)};
        try { location.replace(dest); }
        catch (e) { location.href = dest; }
      }
    })();
  </script>
  <noscript>
    <p>If you’re not redirected, try reloading the page or visiting <a href="${dest}">${dest}</a>.</p>
  </noscript>
</body>
</html>
`;
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
