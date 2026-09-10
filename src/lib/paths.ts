// GitHub project Pages lives under /repository; local development and custom
// domains normally use an empty prefix. This value is fixed at build time.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
if (basePath && (!basePath.startsWith("/") || /[?#\\]/.test(basePath) || basePath.includes("//"))) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or a path like /team-portfolio.");
}

export function withBasePath(url: string): string {
  if (!basePath || !url.startsWith("/") || url.startsWith("//")) return url;
  if (url === basePath || url.startsWith(`${basePath}/`) || url.startsWith(`${basePath}?`) || url.startsWith(`${basePath}#`)) return url;
  return `${basePath}${url}`;
}
