export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Only protect routes that contain '/private/'
  if (!url.pathname.includes("/private/")) {
    return context.next();
  }

  const { request, env } = context;
  const cookieString = request.headers.get("Cookie") || "";
  const isLoggedIn = cookieString.includes("cf_private_auth=true");

  if (isLoggedIn) {
    return context.next();
  }

  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const password = formData.get("password");

      if (password === env.PRIVATE_POST_PASSWORD) {
        // Correct password, set cookie and redirect to the same page
        const response = new Response("Redirecting...", {
          status: 302,
          headers: {
            "Location": url.pathname,
            "Set-Cookie": "cf_private_auth=true; HttpOnly; Secure; Path=/; Max-Age=2592000", // 30 days
          },
        });
        return response;
      }
    } catch (e) {
      // Ignore form parsing errors and fallback to login prompt
    }
  }

  // Return generic login prompt
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Private Content</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .login-box { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        input[type="password"] { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem; width: 100%; box-sizing: border-box; }
        button { padding: 0.5rem 1rem; background-color: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
        button:hover { background-color: #333; }
        .error { color: red; margin-bottom: 1rem; font-size: 0.875rem; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Private Content</h2>
        ${request.method === "POST" ? '<p class="error">Incorrect password. Please try again.</p>' : '<p>Please enter the password to view this post.</p>'}
        <form method="POST">
          <input type="password" name="password" placeholder="Password" required autofocus>
          <button type="submit">Unlock</button>
        </form>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}