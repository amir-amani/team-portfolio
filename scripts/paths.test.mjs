import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

function resolvePaths(prefix) {
  return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", `
    import { withBasePath } from './src/lib/paths.ts';
    console.log(JSON.stringify(['/', '/work/#coffee-shop', '/contact/?interest=rescue', '/og.png', '#main', 'mailto:hello@example.com', 'https://example.com/', '//example.com/image.png', '/team-portfolio/work/'].map(withBasePath)));
  `], { encoding: "utf8", env: { ...process.env, NEXT_PUBLIC_BASE_PATH: prefix } }));
}
test("project Pages prefixes links and assets without changing external URLs or fragment links", () => {
  assert.deepEqual(resolvePaths("/team-portfolio/"), ["/team-portfolio/", "/team-portfolio/work/#coffee-shop", "/team-portfolio/contact/?interest=rescue", "/team-portfolio/og.png", "#main", "mailto:hello@example.com", "https://example.com/", "//example.com/image.png", "/team-portfolio/work/"]);
});
test("root deployments and local development keep root links", () => {
  assert.deepEqual(resolvePaths(""), ["/", "/work/#coffee-shop", "/contact/?interest=rescue", "/og.png", "#main", "mailto:hello@example.com", "https://example.com/", "//example.com/image.png", "/team-portfolio/work/"]);
});
