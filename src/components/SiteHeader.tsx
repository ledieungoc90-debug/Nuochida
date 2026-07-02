import Link from "next/link";
import { Globe2, Mail, MessageCircle } from "lucide-react";
import { siteSettings } from "@/data/nuochida";

function normalizeHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function SiteHeader() {
  return (
    <>
      <Link className="announcement-bar" href="/#contact">
        {siteSettings.announcement}
      </Link>
      <header className="site-header">
        <div className="storied-page-width header-inner">
          <Link className="brand-logo nuochida-logo" href="/" aria-label="Nuochida home">
            <span>Nuochida</span>
          </Link>
          <nav className="primary-nav" aria-label="Primary navigation">
            {siteSettings.navItems.map((link) => (
              <Link key={link.label} href={normalizeHref(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-icons" aria-label="Contact links">
            <Globe2 size={16} strokeWidth={1.8} />
            <Mail size={16} strokeWidth={1.8} />
            <Link className="quote-link" href="/#contact">
              <MessageCircle size={15} strokeWidth={1.8} />
              Get Quote
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
