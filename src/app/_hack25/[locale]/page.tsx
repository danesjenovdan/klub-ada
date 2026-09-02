import { useTranslations } from "next-intl";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Timeline } from "./timeline";
import { Prizes } from "./prizes";
import { Faq } from "./faq";
import { Sponsors } from "./sponsors";
import { CallToAction } from "./call-to-action";
import { Footer } from "./footer";
import UnicornScene from "unicornstudio-react/next";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <div className="box-border bg-[#000] max-w-full min-h-[100vh] relative">
      <div className="hidden md:block fixed top-0 left-0 bottom-0 right-0">
        <UnicornScene
          projectId="37S3ad8JDraTZQd2BVQn"
          width="100%"
          height="100vh"
        />
      </div>
      <div className="block md:hidden fixed top-0 left-0 bottom-0 right-0 inset-0">
        <video
          className="w-full h-full object-cover bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23000000'/%3E%3C/svg%3E"
        >
          <source
            src="/assets/hackathon/hackathon-loop.webm"
            type="video/webm"
          />
        </video>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 overflow-scroll">
        <Hero />
        <Stats />
        <Timeline />
        <Prizes />
        <Faq />
        <Sponsors />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
