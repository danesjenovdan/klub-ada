import { Button } from "./button";
import { Heading } from "./heading";
import NewsletterComponent2 from "./newsletter-component-2";
import { PageWrapper } from "./page-wrapper";

export function NewsletterComponent() {
  return (
    <PageWrapper bgColor="bg-pink">
      <div className="flex justify-center items-center">
        <NewsletterComponent2 />
      </div>
    </PageWrapper>
  );
}
