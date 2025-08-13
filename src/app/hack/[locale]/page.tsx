import { useTranslations } from "next-intl";
import { Hero } from "./hero";
import { Stats } from "./stats";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <>
      <Hero />
      <Stats />
    </>
  );
}
