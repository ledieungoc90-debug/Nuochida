import { CustomAndFooter } from "@/components/CustomAndFooter";
import { HeroSection } from "@/components/HeroSection";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustAndPopular } from "@/components/TrustAndPopular";
import { WhySection } from "@/components/WhySection";

export default function Home() {
  return (
    <main className="storied-home">
      <SiteHeader />
      <HeroSection />
      <TrustAndPopular />
      <WhySection />
      <CustomAndFooter />
    </main>
  );
}
