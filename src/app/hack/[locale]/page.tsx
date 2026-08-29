import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Activities");
  return (
    <div className="bg-[#000] max-w-full h-[calc(100vh-68px)] md:h-[calc(100vh-68px)] relative"></div>
  );
}
