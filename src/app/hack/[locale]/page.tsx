import { useTranslations } from "next-intl";
import UnicornScene from "unicornstudio-react/next";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <div className="box-border bg-[#000] max-w-full min-h-[100vh] relative"></div>
  );
}
