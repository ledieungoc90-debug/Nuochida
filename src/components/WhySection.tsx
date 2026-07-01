import Link from "next/link";
import { CheckCircle2, Factory, Scissors, ShieldCheck } from "lucide-react";
import { factoryStats, oemCapabilities } from "@/data/nuochida";

export function WhySection() {
  return (
    <section className="why-section" id="oem">
      <div className="storied-page-width">
        <div className="section-heading-centered">
          <p className="section-kicker">OEM & ODM Capability</p>
          <h2 className="section-title">From Logo Artwork To Export Cartons</h2>
          <p>
            Keep the clean visual confidence of the reference site, but make every block
            answer a buyer&apos;s real manufacturing question.
          </p>
        </div>

        <div className="capability-layout">
          <div className="capability-card main">
            <Scissors size={34} />
            <h3>Private Label Development</h3>
            <p>
              Choose crown shape, brim, fabric, closure, logo method, lining, sweatband,
              packaging, and carton marks before production starts.
            </p>
            <Link className="storied-pill black-pill" href="#contact">
              Discuss My Hat Project
            </Link>
          </div>
          <div className="capability-list">
            {oemCapabilities.map((item) => (
              <div className="capability-line" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="factory-proof" id="factory">
          <div className="factory-copy">
            <p className="section-kicker">Factory Proof</p>
            <h2>Built For Repeat Wholesale Orders</h2>
            <p>
              Nuochida&apos;s workflow is designed for sampling, confirmation, bulk production,
              quality checking, and export packing. Directus will let the team update
              product categories, specs, homepage banners, and incoming inquiries.
            </p>
          </div>
          <div className="factory-stats">
            {factoryStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="process-card">
            <Factory size={28} />
            <h3>Production Flow</h3>
            <ol>
              <li>Confirm artwork, material, size, and packaging.</li>
              <li>Make samples for buyer approval.</li>
              <li>Produce bulk order with inline QC.</li>
              <li>Inspect, pack, and prepare export delivery.</li>
            </ol>
          </div>
          <div className="process-card">
            <ShieldCheck size={28} />
            <h3>Quality Control</h3>
            <ol>
              <li>Check logo position and thread/patch quality.</li>
              <li>Review dimensions, stitching, color, and shape.</li>
              <li>Confirm packing marks and carton condition.</li>
              <li>Share shipment photos before dispatch.</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
