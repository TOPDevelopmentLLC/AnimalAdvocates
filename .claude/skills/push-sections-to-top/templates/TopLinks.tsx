import { Fragment, type ReactNode } from "react";
import { Link } from "react-router";
import type { Cta } from "../lib/topContent";

/**
 * Renders a CMS link: site routes ("/donate") use the router, http(s) links
 * open in a new tab, and mailto:/tel: links are plain anchors.
 */
export function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  if (/^https?:/i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/**
 * Plain CMS text where any CTA label it mentions (an email, a phone number)
 * becomes a link in place, matching how the hand-written pages inline them.
 */
export function LinkedText({
  text,
  links = [],
  linkClassName,
}: {
  text: string;
  links?: Cta[];
  linkClassName?: string;
}) {
  const present = links.filter((l) => l.label && text.includes(l.label));
  if (present.length === 0) return <>{text}</>;

  const escaped = present.map((l) => l.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return (
    <>
      {parts.map((part, i) => {
        const link = present.find((l) => l.label === part);
        return link ? (
          <CtaLink key={i} href={link.href} className={linkClassName}>
            {part}
          </CtaLink>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
