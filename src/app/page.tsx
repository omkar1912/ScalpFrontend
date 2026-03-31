import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Sectors } from "@/components/sections/Sectors";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Sectors />
      <HowItWorks />
      <Stats />
      <LatestBlog />
      <EnquiryForm />
    </div>
  );
}
