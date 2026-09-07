import { useTranslations } from "next-intl";
import { Window } from "../components/window";
import { Gallery } from "./gallery";

export default function Page() {
  const t = useTranslations("Hackathon");

  return (
    <Window title={t("pages.pictures")}>
      <Gallery />
    </Window>
  );
}
