import { Hero } from "./hero";
import { NextEvent } from "./next-event";
import { Aktivnosti } from "./aktivnosti";
import { Reviews } from "./reviews";
import { TopBlogs } from "./top-blogs";
import { Footer } from "@/src/app/components/footer";
import { Logos } from "./logos";
import { Discord } from "./discord";
export default function Page() {
  return (
    <>
      <Hero />
      <Logos />
      <NextEvent />
      <Aktivnosti />
      <Reviews />
      <Discord />
      <TopBlogs />
      <Footer />
    </>
  );
}
