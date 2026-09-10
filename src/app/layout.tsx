import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: "Amir Amani — Web Developer for Small Businesses", template: "%s | Amir Amani" },
  applicationName: "Amir Amani", authors: [{ name: site.name }],
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personId = `${site.url}/#amir`;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Person", "@id": personId, name: site.name, url: site.url, jobTitle: "Web Developer and Technical Lead", description: "Independent web developer leading a small three-person team.", homeLocation: { "@type": "Country", name: "Iran" }, ...(site.emailConfigured ? { email: site.email } : {}), sameAs: site.socials.map(s => s.url) },
    { "@type": "ProfessionalService", "@id": `${site.url}/#service`, name: "Amir Amani — Web Development", url: site.url, founder: { "@id": personId }, description: "Focused website improvements, mobile website fixes, booking and inquiry flows, frontend integration, and small web applications.", address: { "@type": "PostalAddress", addressCountry: "IR" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Web development services", itemListElement: ["Website Rescue Sprint", "Small Business Website", "Landing Page Improvement", "Booking and Inquiry Flows", "Frontend and API Integration", "Lightweight Web Applications"].map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
  ] };
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /></body></html>;
}
