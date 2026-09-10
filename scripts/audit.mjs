import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

await mkdir("artifacts/lighthouse-profile", { recursive: true });
const chrome = await launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ["--headless", "--no-sandbox"],
  userDataDir: path.resolve("artifacts/lighthouse-profile"),
});
const summary = [];
try {
  const origin = process.env.AUDIT_ORIGIN || "http://127.0.0.1:3001";
  for (const [route, desktop] of [["", false], ["services/", false], ["work/", false], ["about/", false], ["contact/", false], ["", true]]) {
    const id = `${route.replace("/", "") || "home"}-${desktop ? "desktop" : "mobile"}`;
    const result = await lighthouse(`${origin}/${route}`, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] }, desktop ? desktopConfig : undefined);
    if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError || "No audit result"));
    await writeFile(`artifacts/${id}.json`, result.report);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    const record = { id, scores, lcp: result.lhr.audits["largest-contentful-paint"].displayValue, cls: result.lhr.audits["cumulative-layout-shift"].displayValue };
    summary.push(record);
    console.log(JSON.stringify(record));
  }
  await writeFile("artifacts/audit-summary.json", JSON.stringify(summary, null, 2));
} finally {
  await chrome.kill();
}
