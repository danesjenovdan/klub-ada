import { useTranslations } from "next-intl";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Timeline } from "./timeline";
import { Prizes } from "./prizes";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <>
      <Hero />
      <Stats />
      <Timeline />
      <Prizes />
    </>
  );
}
