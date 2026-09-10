import type { AnchorHTMLAttributes } from "react";

// Native document navigation keeps this static portfolio portable across hosts
// and avoids shipping a client router just to move between five small pages.
export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
