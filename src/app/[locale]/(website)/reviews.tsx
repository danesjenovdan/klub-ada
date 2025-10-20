import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import ReviewComponent from "@/src/app/[locale]/components/review-component";
import { LinkButton } from "@/src/app/[locale]/components/link-button";
import { useLocale, useTranslations } from "next-intl";

const reviewsSl = [
  {
    id: 1,
    paragraph:
      '"Najprej sem spoznala Simono, soustanoviteljico kluba Ada. Bila je finalistka za Inženirko leta 2023 in se mi je kot mlada, prikupna, a nadvse nadobudna inženirka prav vtisnila v spomin. Ker sem tudi sama del inženirskega kroga, kjer imamo v podjetju Danfoss ekipo Women in STEM, sva s Simono vzpostavili stik in se dogovorili za sodelovanje na okrogli mizi z naslovom »Koda za uspeh: delavnica načrtovanja kariere v tehnologiji!«.',
    emphasis:
      'Klub Ada navdihuje mlade in tudi manj mlade. So zagnana ekipa z veliko idejami, ki jih z lahkoto tekom leta realizirajo v uspešne dogodke in projekte. Stvari počnejo s srcem. Zato jih podpiram in jim želim uspeh tudi v prihodnje!"',
    image: "/assets/tamara-stumperger.webp",
    alt: "Tamara Stumperger profile picture",
    title:
      "Tamara Štumperger, Supplier Quality System Senior Manager @ Danfoss",
    href: "https://www.linkedin.com/in/tamarastumperger/",
  },
  {
    id: 2,
    paragraph:
      '"Do sedaj sem se udeležila le enega dogodka, me je ta navdušil. Dogodek je bil odlično organiziran, z aktualnimi temami in izjemnimi gostjami. Srečala sem ženske s podobnimi izkušnjami, kar mi je dalo zagon za nadaljnje učenje in delo. Vesela sem, da pri nas obstaja takšna skupnost, kjer lahko najdeš podporo in nasvete za karierno pot.',
    emphasis:
      'Priporočam tudi pridružitev Discord skupini za še več povezovanja in izmenjave izkušenj."',
    image: "/assets/marusa-kerpan.webp",
    alt: "Marusa Kerpan profile picture",
    title: "Maruša Kerpan, Automation Engineer @ Domel",
    href: "https://www.linkedin.com/in/maru%C5%A1a-kerpan-1196782aa/",
  },
  {
    id: 3,
    paragraph: '"Dogodkov Kluba Ada se udeležujem že od samega začetka.',
    emphasis:
      'Udeležba na delavnicah mi je dala priložnost, da se povežem z drugimi ženskami v tehnologiji, pridobim nova znanja in predvsem samozavest za nadaljevanje svoje kariere."',
    image: "/assets/jana-vovk.webp",
    alt: "Jana Volk profile picture",
    title: "Jana Volk, Student @ FRI",
    href: "https://www.fri.uni-lj.si/sl/novice/novica/uspeh-studentov-fri-na-vseslovenskem-hackathonu",
  },
  {
    id: 4,
    paragraph:
      '"Pred nekaj meseci sem potrebovala nasvet pri iskanju prve zaposlitve, in res, kapa dol za vso pomoč, podporo in nasvete, ki sem jih prejela. Tudi sami dogodki so odlično preživet čas v družbi ambicioznih in pozitivno naravnanih žensk v tehnologiji. Discord skupnost kluba Ada je prava zakladnica za vse, ki iščejo motivacijo, zaposlitev, izobraževanje ali pa samo dobro knjigo.',
    emphasis: 'Moja izkušnja s Klubom Ada je čista pozitiva!"',
    image: "/assets/nika-likar.webp",
    alt: "Nika Likar profile picture",
    title: "Nika Likar, UX Designer @ Omnia8",
    href: "https://www.linkedin.com/in/nika-likar-6b8b9a217/",
  },
  {
    id: 5,
    paragraph:
      '"S pomočjo Kluba Ada sem izvedela za številne zanimive dogodke, ki so mi omogočili, da se družim in spletam nova prijateljstva z izjemnimi ženskami iz IT sveta. Nazadnje smo se srečale kar v Berlinu in skupaj preživele čudovit dan na konferenci.',
    emphasis:
      'Res je lep občutek biti del združenja, kjer te podpirajo podobno misleče ženske, ki te razumejo in spodbujajo."',
    image: "/assets/tamara-demir.webp",
    alt: "Tamara Demir profile picture",
    title: "Tamara Demir, Web Developer @ ENKI",
    href: "https://www.linkedin.com/in/tamara-demir/",
  },
];

const reviewsEn = [
  {
    id: 1,
    paragraph:
      '"First, I met Simona, the co-founder of Klub Ada. She was a finalist for Engineer of the Year 2023 and left quite an impression on me as a young, charming, yet extremely ambitious engineer. Since I myself am also part of the engineering circle, where we have a Women in STEM team at Danfoss, Simona and I got in touch and agreed to collaborate on a panel discussion titled “Code for Success: A Career Planning Workshop in Technology!”',
    emphasis:
      "Klub Ada inspires both the young and the not-so-young. They are an enthusiastic team with lots of ideas, which they easily turn into successful events and projects throughout the year. They do things with heart. That's why I support them and wish them continued success in the future!",
    image: "/assets/tamara-stumperger.webp",
    alt: "Tamara Stumperger profile picture",
    title:
      "Tamara Štumperger, Supplier Quality System Senior Manager @ Danfoss",
    href: "https://www.linkedin.com/in/tamarastumperger/",
  },
  {
    id: 2,
    paragraph:
      '"So far I have only attended one event, but it impressed me. The event was excellently organized, with relevant topics and amazing guest speakers. I met women with similar experiences, which gave me motivation to continue learning and working. I’m happy that such a community exists here, where you can find support and advice for your career path.',
    emphasis:
      'I also recommend joining the Discord community for even more connections and exchange of experiences."',
    image: "/assets/marusa-kerpan.webp",
    alt: "Marusa Kerpan profile picture",
    title: "Maruša Kerpan, Automation Engineer @ Domel",
    href: "https://www.linkedin.com/in/maru%C5%A1a-kerpan-1196782aa/",
  },
  {
    id: 3,
    paragraph: '"I have been attending Klub Ada events from the beginning.',
    emphasis:
      'Attending the workshops gave me the opportunity to connect with other women in technology, gain new knowledge, and above all, the confidence to continue my career."',
    image: "/assets/jana-vovk.webp",
    alt: "Jana Volk profile picture",
    title: "Jana Volk, Student @ FRI",
    href: "https://www.fri.uni-lj.si/sl/novice/novica/uspeh-studentov-fri-na-vseslovenskem-hackathonu",
  },
  {
    id: 4,
    paragraph:
      '"A few months ago, I needed advice on finding my first job, and honestly, hats off for all the help, support, and guidance I received. The events themselves are also a great way to spend time in the company of ambitious and positively minded women in technology. The Klub Ada Discord community is a real treasure trove for anyone looking for motivation, a job, education, or just a good book.',
    emphasis: 'My experience with Klub Ada is 100% positive!"',
    image: "/assets/nika-likar.webp",
    alt: "Nika Likar profile picture",
    title: "Nika Likar, UX Designer @ Omnia8",
    href: "https://www.linkedin.com/in/nika-likar-6b8b9a217/",
  },
  {
    id: 5,
    paragraph:
      '"With the help of Klub Ada, I learned about many interesting events that allowed me to socialize and make new friendships with amazing women from the IT world. Most recently, we even met in Berlin and spent a wonderful day together at a conference.',
    emphasis:
      'It’s truly a wonderful feeling to be part of an association where like-minded women support, understand, and encourage you."',
    image: "/assets/tamara-demir.webp",
    alt: "Tamara Demir profile picture",
    title: "Tamara Demir, Web Developer @ ENKI",
    href: "https://www.linkedin.com/in/tamara-demir/",
  },
];

export function Reviews() {
  const t = useTranslations("Reviews");
  const locale = useLocale();
  const reviews = locale === "en" ? reviewsEn : reviewsSl;

  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="max-w-sm md:max-w-2xl">
            <Heading size="lg">{t("title")}</Heading>
          </div>
          <div className="">
            <LinkButton size="md" variant="secondary" href="/partnerstvo">
              {t("cta")}
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex md:basis-3/5">
              {reviews
                .filter((review) => review.id === 1)
                .map((review) => (
                  <ReviewComponent
                    key={review.id}
                    paragraph={review.paragraph}
                    emphasis={review.emphasis}
                    image={review.image}
                    alt={review.alt}
                    title={review.title}
                    href={review.href}
                  />
                ))}
            </div>
            <div className="md:basis-2/5">
              {reviews
                .filter((review) => review.id === 2)
                .map((review) => (
                  <ReviewComponent
                    key={review.id}
                    paragraph={review.paragraph}
                    emphasis={review.emphasis}
                    image={review.image}
                    alt={review.alt}
                    title={review.title}
                    href={review.href}
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex md:basis-1/3">
              {reviews
                .filter((review) => review.id === 3)
                .map((review) => (
                  <ReviewComponent
                    key={review.id}
                    paragraph={review.paragraph}
                    emphasis={review.emphasis}
                    image={review.image}
                    alt={review.alt}
                    title={review.title}
                    href={review.href}
                  />
                ))}
            </div>
            <div className="flex md:basis-1/3">
              {reviews
                .filter((review) => review.id === 4)
                .map((review) => (
                  <ReviewComponent
                    key={review.id}
                    paragraph={review.paragraph}
                    emphasis={review.emphasis}
                    image={review.image}
                    alt={review.alt}
                    title={review.title}
                    href={review.href}
                  />
                ))}
            </div>
            <div className="flex md:basis-1/3">
              {reviews
                .filter((review) => review.id === 5)
                .map((review) => (
                  <ReviewComponent
                    key={review.id}
                    paragraph={review.paragraph}
                    emphasis={review.emphasis}
                    image={review.image}
                    alt={review.alt}
                    title={review.title}
                    href={review.href}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
