import { useTranslations } from "next-intl";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Timeline } from "./timeline";
import { Prizes } from "./prizes";
import { Faq } from "./faq";
import { Sponsors } from "./sponsors";
import { CallToAction } from "./call-to-action";
import { Footer } from "./footer";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <>
      <Hero />
      <Stats />
      <Timeline />
      <Prizes />
      <Faq />
      <Sponsors />
      <CallToAction />
      <Footer />
    </>
  );
}
