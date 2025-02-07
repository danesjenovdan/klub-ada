import { Footer } from "@/app/components/footer";
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
