import Hero from "@/components/sections/Hero";
import WorkspacePreview from "@/components/sections/WorkspacePreview";
import SocialProof from "@/components/sections/SocialProof";
import AlternatingFeatures from "@/components/sections/AlternatingFeatures";
import ProductCards from "@/components/sections/ProductCards";
import SecuritySlice from "@/components/sections/SecuritySlice";
import BusinessBanner from "@/components/sections/BusinessBanner";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <WorkspacePreview />
      <SocialProof />
      <AlternatingFeatures />
      <ProductCards />
      <SecuritySlice />
      <BusinessBanner />
    </>
  );
}
