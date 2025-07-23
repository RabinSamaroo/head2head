import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    // Validate that the URL is from op.gg
    const targetUrl = new URL(url);
    // if (!targetUrl.hostname.includes('op.gg')) {
    //   return res.status(403).json({ error: 'Only op.gg URLs are allowed' });
    // }

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let html = await response.text();

    // // Modify the HTML to make relative URLs absolute
    // const baseUrl = `${targetUrl.protocol}//${targetUrl.host}`;

    // // Replace relative URLs with absolute URLs
    // html = html.replace(/href="\/([^"]*)"/g, `href="${baseUrl}/$1"`);
    // html = html.replace(/src="\/([^"]*)"/g, `src="${baseUrl}/$1"`);
    // html = html.replace(/url\(\/([^)]*)\)/g, `url(${baseUrl}/$1)`);

    // // Add base tag to handle remaining relative URLs
    // html = html.replace("<head>", `<head><base href="${baseUrl}/">`);

    // Remove X-Frame-Options and other restrictive headers
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *");

    res.status(200).send(html);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch the requested page" });
  }
}
