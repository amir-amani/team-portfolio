import type { AnchorHTMLAttributes } from "react";
import { withBasePath } from "@/lib/paths";

// Native document navigation keeps this static portfolio portable across hosts
// and avoids shipping a client router just to move between five small pages.
export default function Link({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={href ? withBasePath(href) : href} />;
}
