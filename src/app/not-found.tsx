import { PageIntro, Button } from "@/components/ui";
export default function NotFound() {
  return <><PageIntro eyebrow="404 / A small detour" title="This page isn’t here."><p>The link may have changed. Let’s get you back to something useful.</p></PageIntro><div className="container content-section"><Button href="/">Back to home</Button></div></>;
}
