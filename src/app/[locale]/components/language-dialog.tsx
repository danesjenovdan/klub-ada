import { useLocale, useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { Button } from "./button";
import { IconLanguage } from "@tabler/icons-react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Heading } from "./heading";
import { useRouter, usePathname } from "../../../i18n/navigation";

export function LanguageDialog() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const changeLocale = (locale: "sl" | "en") => {
    router.replace({ pathname }, { locale, scroll: false });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="secondary"
          size="sm"
          iconRight={IconLanguage}
          className="self-start"
        >
          {locale === "en" ? t("Common.english") : t("Common.slovene")}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black opacity-50 inset-0 z-30" />
        <Dialog.Content className="fixed max-w-full flex flex-col z-30 p-8 pr-12 bg-white border border-black rounded-xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <Dialog.Close className="absolute top-3 right-3">
            <XMarkIcon className="w-6 h-6" />
          </Dialog.Close>
          <Dialog.Title asChild>
            <Heading size="sm">{"Choose a language"}</Heading>
          </Dialog.Title>
          <div className="flex flex-col gap-3 pt-4 items-start">
            <Dialog.Close asChild>
              <Button
                variant="secondary"
                size="sm"
                iconRight={IconLanguage}
                onClick={() => changeLocale("sl")}
              >
                {"Slovenščina"}
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                variant="secondary"
                size="sm"
                iconRight={IconLanguage}
                onClick={() => changeLocale("en")}
              >
                {"English"}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
