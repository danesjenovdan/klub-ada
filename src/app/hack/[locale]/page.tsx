import { useTranslations } from "next-intl";
import { Hero } from "./hero";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <>
      <Hero />
      <div>{t("description")}</div>
    </>
  );
}
