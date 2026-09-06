import { useTranslations } from "next-intl";
import { Window } from "../components/window";

export default function Page() {
  const t = useTranslations("Hackathon");

  return (
    <Window title={t("pages.numbers")}>
      <p className="font-paragraph text-base">{t("main_cta")}</p>
    </Window>
  );
}
