import { Button } from "./button";
import { Heading } from "./heading";
import { PageWrapper } from "./page-wrapper";
import { Paragraph } from "./paragraph";

export function NewsletterComponent() {
  return (
    <PageWrapper bgColor="bg-pink">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4 md:gap-8 border border-black rounded-2xl p-10 bg-pink100 max-w-[600px]">
          <div className="flex flex-col gap-4 text-ceneter">
            <Heading size="sm">{"Prijavi se na novičnik"}</Heading>
            <Paragraph size="md">
              {
                "S prijavo na naš novičnik boš prejela vabila na prihajajoče dogodke in povzetke dogodkov, uporabne nasvete, povezave do drugih koristnih virov, kot so hekatoni, karierni dogodki, zaposlitvene priložnosti in še več."
              }
            </Paragraph>
          </div>
          <div className="flex flex-col">
            <div className="ml-embedded" data-form="14J8zj"></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
