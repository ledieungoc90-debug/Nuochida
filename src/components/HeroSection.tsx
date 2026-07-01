import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { factoryStats, siteSettings } from "@/data/nuochida";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="hero-eyebrow">OEM / ODM Hat Manufacturer</p>
        <h1>Custom Hats Built for Your Brand</h1>
        <p>
          OEM/ODM baseball caps, trucker hats, bucket hats, beanies, and outdoor
          headwear from sample approval to bulk delivery.
        </p>
        <div className="hero-actions">
          <Link className="storied-pill hero-button" href="#contact">
            Send Inquiry <ArrowRight size={18} />
          </Link>
          <Link className="storied-pill hero-secondary" href="#products">
            View Products
          </Link>
        </div>
        <div className="hero-proof" aria-label={`${siteSettings.brandName} manufacturing highlights`}>
          {factoryStats.slice(0, 3).map((stat) => (
            <span key={stat.label}>
              <CheckCircle2 size={16} />
              {stat.value} {stat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
