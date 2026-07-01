import Link from "next/link";
import { ArrowRight, Database, Mail, MessageCircle } from "lucide-react";
import { directusCollections, productCategories, siteSettings } from "@/data/nuochida";
import { buildWhatsappUrl } from "@/lib/inquiry";

export function CustomAndFooter() {
  const whatsappHref = buildWhatsappUrl({
    number: siteSettings.whatsappNumber,
    brandName: siteSettings.brandName,
    product: "custom logo hats",
  });

  return (
    <>
      <section className="custom-section" id="about">
        <div className="storied-page-width custom-panel">
          <div className="custom-image nuochida-sampling-image" aria-hidden="true" />
          <div className="custom-copy">
            <p className="section-kicker light">Custom Brand Programs</p>
            <h2>Build A Hat Line Without Managing The Factory Details</h2>
            <p>
              Send your logo, preferred style, target quantity, and packaging needs.
              Nuochida helps turn the brief into samples, production specs, and export
              packing.
            </p>
            <Link className="storied-pill white-pill" href="#contact">
              Start A Custom Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="inquiry-section" id="contact">
        <div className="storied-page-width inquiry-grid">
          <div className="inquiry-copy">
            <p className="section-kicker">Send Inquiry</p>
            <h2>Tell Us What You Want To Make</h2>
            <p>
              This form is Directus-ready. In production, submissions can be written to
              the `inquiries` collection with selected product and page URL context.
            </p>
            <div className="contact-actions">
              <Link className="storied-pill black-pill" href={`mailto:${siteSettings.email}`}>
                <Mail size={16} /> {siteSettings.email}
              </Link>
              <Link className="storied-pill outline-pill" href={whatsappHref}>
                <MessageCircle size={16} /> WhatsApp
              </Link>
            </div>
          </div>

          <form className="inquiry-form">
            <label>
              Name
              <input name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" placeholder="you@company.com" type="email" />
            </label>
            <label>
              Company
              <input name="company" placeholder="Company / brand" />
            </label>
            <label>
              Product Interest
              <select name="product" defaultValue="custom-logo-hats">
                {productCategories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="wide">
              Message
              <textarea
                name="message"
                placeholder="Tell us quantity, logo method, material, delivery country, and sample needs."
              />
            </label>
            <button className="storied-pill submit-button" type="button">
              Submit Inquiry <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="directus-section">
        <div className="storied-page-width directus-card">
          <Database size={28} />
          <div>
            <p className="section-kicker">Directus Backend</p>
            <h2>Ready For Editable Products, Homepage Content, And Inquiries</h2>
            <p>
              Deploy Directus + Postgres on Alibaba Cloud ECS. The frontend stays on
              Vercel and can fetch published content server-side with a private token.
            </p>
          </div>
          <ul>
            {directusCollections.map((collection) => (
              <li key={collection}>{collection}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div className="storied-page-width footer-grid">
          <div>
            <h2>Products</h2>
            {productCategories.slice(0, 4).map((category) => (
              <Link key={category.slug} href="#products">
                {category.title}
              </Link>
            ))}
          </div>
          <div>
            <h2>Services</h2>
            <Link href="#oem">OEM & ODM</Link>
            <Link href="#factory">Factory QC</Link>
            <Link href="#contact">Request Quote</Link>
          </div>
          <div>
            <h2>Nuochida</h2>
            <p>Custom hats built for your brand.</p>
            <p>Frontend: Vercel. Backend: Directus on Alibaba Cloud ECS.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
