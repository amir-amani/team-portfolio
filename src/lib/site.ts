import type { Metadata } from "next";

function publicUrl(value: string | undefined, fallback = ""): string {
  if (!value) return fallback;
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error("Site and social URLs must use HTTP or HTTPS.");
  return url.href.replace(/\/$/, "");
}
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";
if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) throw new Error("Configure a valid contact email address.");
export const site = {
  name: "Amir Amani",
  url: publicUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://amir-amani.github.io/team-portfolio"),
  email,
  emailConfigured: email !== "hello@example.com",
  socials: [
    { label: "GitHub", url: publicUrl(process.env.NEXT_PUBLIC_GITHUB_URL) },
    { label: "LinkedIn", url: publicUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL) },
  ].filter((social) => social.url),
};
export function emailLink(subject = "A small website improvement") {
  const body = "Hi Amir,\n\nMy website or business:\nThe part I would like to improve:\nWhat I want customers to be able to do:\nTiming and budget, if known:\n\nThanks!";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} | Amir Amani`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_US", siteName: site.name, title: fullTitle, description, url, images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: "Amir Amani — Practical websites. Focused improvements." }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${site.url}/og.png`] },
  };
}
