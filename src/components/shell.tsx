import Link from "@/components/link";
import { site } from "@/lib/site";
import { Arrow } from "./ui";
const nav = [["Services", "/services/"], ["Work", "/work/"], ["About", "/about/"], ["Contact", "/contact/"]] as const;
export function Header() {
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="wordmark" aria-label="Amir Amani, Developer & technical lead — home"><span className="monogram" aria-hidden="true">a<span>.</span></span><span>Amir Amani<span className="wordmark-caption">Developer & technical lead</span></span></Link>
    <nav aria-label="Main navigation"><ul>{nav.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
    <Link className="header-cta" href="/contact/">Let’s talk <Arrow diagonal /></Link>
  </div></header>;
}
export function Footer() {
  return <footer className="site-footer container"><div><Link className="footer-name" href="/">Amir Amani<span className="accent">.</span></Link><p>Thoughtful websites. Useful improvements.</p></div><div className="footer-links"><nav aria-label="Footer navigation">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><p>Based in Iran · Working with clients remotely</p>{site.socials.length > 0 && <div>{site.socials.map(s => <a key={s.label} href={s.url} rel="me">{s.label} <Arrow diagonal /></a>)}</div>}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Amir Amani</span><span>Small team. Direct conversations.</span></div></footer>;
}
