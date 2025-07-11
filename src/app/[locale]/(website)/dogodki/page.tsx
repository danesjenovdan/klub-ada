import { Footer } from "@/src/app/components/footer";
import Hero from "./hero";
import { NextEvent } from "../next-event";
import PastEvents from "./past-events";

export default function Page() {
  return (
    <>
      <Hero />
      <NextEvent />
      <PastEvents />
      <Footer />
    </>
  );
}
