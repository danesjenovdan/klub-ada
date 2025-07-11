import { Footer } from "@/src/app/[locale]/components/footer";
import { Collaboration } from "./collaboration";
import { Hero } from "./hero";
import { Statistics } from "./statistics";
import { WhyPartner } from "./why-partner";
import { PartnersList } from "./partners-list";
import { BecomePartner } from "./become-partner";

export default function Page() {
  return (
    <>
      <Hero />
      <WhyPartner />
      <Collaboration />
      <Statistics />
      <BecomePartner />
      <PartnersList />
      <Footer />
    </>
  );
}
