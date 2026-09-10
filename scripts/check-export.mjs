import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const titles = new Set();
const descriptions = new Set();
for (const route of ["", "services/", "work/", "about/", "contact/"]) {
  const html = await readFile(`out/${route}index.html`, "utf8");
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: exactly one h1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`); titles.add(title);
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(description && !descriptions.has(description), `${route}: unique description`); descriptions.add(description);
  for (const tag of ['rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'name="twitter:card"', 'name="twitter:title"', 'name="twitter:description"', 'name="twitter:image"']) assert.ok(html.includes(tag), `${route}: ${tag}`);
  if (siteUrl) {
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}/${route}"`), `${route}: correct deployment canonical`);
    assert.ok(html.includes(`${siteUrl}/og.png`), `${route}: correct social image URL`);
  }
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  const data = JSON.parse(json);
  assert.ok(data["@graph"].some(item => item["@type"] === "Person"));
  assert.ok(data["@graph"].some(item => item["@type"] === "ProfessionalService"));
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    if (url.startsWith("//")) continue;
    assert.ok(!basePath || url.startsWith(`${basePath}/`), `${route}: URL escapes deployment prefix: ${url}`);
    const localPath = url.slice(basePath.length);
    await access(path.join("out", localPath.endsWith("/") ? `${localPath}index.html` : localPath));
  }
  console.log(`PASS /${route}: headings, unique SEO, social metadata, schema, local links`);
}
for (const file of ["sitemap.xml", "robots.txt", "og.png", "icon.svg", "404.html", ".nojekyll"]) await access(`out/${file}`);
const sitemap = await readFile("out/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
if (siteUrl) {
  for (const route of ["", "services/", "work/", "about/", "contact/"]) assert.ok(sitemap.includes(`<loc>${siteUrl}/${route}</loc>`));
}
const robots = await readFile("out/robots.txt", "utf8");
assert.ok(robots.includes("Sitemap:"));
console.log("PASS sitemap, robots, favicon, social image, 404");
