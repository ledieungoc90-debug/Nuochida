import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, PackageCheck, TimerReset } from "lucide-react";
import { productCategories, trustCards } from "@/data/nuochida";

const trustIcons = [Boxes, TimerReset, BadgeCheck, PackageCheck];

export function TrustAndPopular() {
  return (
    <section className="trust-popular" id="products">
      <div className="storied-page-width">
        <div className="trust-grid">
          {trustCards.map((card, index) => {
            const Icon = trustIcons[index];
            return (
              <div className="trust-card" key={card.title}>
                <Icon size={28} strokeWidth={1.8} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            );
          })}
        </div>

        <div className="forehead-cta">
          <h2>Start With A Sample, Scale To Bulk Production</h2>
          <p>
            Nuochida helps brands, distributors, teams, and promotional buyers turn hat
            ideas into production-ready orders.
          </p>
          <Link className="storied-pill black-pill" href="#contact">
            Request Sample Quote
          </Link>
        </div>

        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Product Categories</p>
            <h2 className="section-title left">Custom Hats We Manufacture</h2>
          </div>
          <Link className="text-link" href="#contact">
            Send product list <ArrowRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {productCategories.map((card) => (
            <Link className="product-card" href="#contact" key={card.slug}>
              <div className="product-visual" aria-hidden="true">
                <span>{card.title.split(" ")[0]}</span>
              </div>
              <div className="product-card-copy">
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <ul>
                  {card.specs.slice(0, 3).map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <strong>{card.inquiryLabel} →</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
