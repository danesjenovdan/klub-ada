import { Footer } from "@/src/app/[locale]/components/footer";
import { Hero } from "./hero";
import Team from "./team";
import { Mission } from "./mission";

export default function Page() {
  return (
    <>
      <Hero />
      <Mission />
      <Team />
      <Footer />
    </>
  );
}
