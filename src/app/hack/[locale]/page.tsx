import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <>
      <div>{t("description")}</div>
    </>
  );
}
