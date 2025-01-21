import { Heading } from "../components/heading";
import { PageWrapper } from "../components/page-wrapper";
import ReviewComponent from "../components/review-component";
import { LinkButton } from "../components/link-button";

const reviews = [
  {
    id: 1,
    paragraph:
      '"Najprej sem spoznala Simono, soustanoviteljico kluba Ada. Bila je finalistka za Inženirko leta 2023 in se mi je kot mlada, prikupna, a nadvse nadobudna inženirka prav vtisnila v spomin. Ker sem tudi sama del inženirskega kroga, kjer imamo v podjetju Danfoss ekipo Women in STEM, sva s Simono vzpostavili stik in se dogovorili za sodelovanje na okrogli mizi z naslovom »Koda za uspeh: delavnica načrtovanja kariere v tehnologiji!«.',
    emphasis:
      'Klub Ada navdihuje mlade in tudi manj mlade. So zagnana ekipa z veliko idejami, ki jih z lahkoto tekom leta realizirajo v uspešne dogodke in projekte. Stvari počnejo s srcem. Zato jih podpiram in jim želim uspeh tudi v prihodnje!"',
    image: "/assets/tamara-stumperger.jpeg",
    alt: "Tamara Stumperger profile picture",
    title:
      "Tamara Štumperger, Supplier Quality System Senior Manager @ Danfoss",
  },
  {
    id: 2,
    paragraph:
      '"Do sedaj sem se udeležila le enega dogodka, me je ta navdušil. Dogodek je bil odlično organiziran, z aktualnimi temami in izjemnimi gostjami. Srečala sem ženske s podobnimi izkušnjami, kar mi je dalo zagon za nadaljnje učenje in delo. Vesela sem, da pri nas obstaja takšna skupnost, kjer lahko najdeš podporo in nasvete za karierno pot.',
    emphasis:
      'Priporočam tudi pridružitev Discord skupini za še več povezovanja in izmenjave izkušenj."',
    image: "/assets/marusa-kerpan.jpeg",
    alt: "Marusa Kerpan profile picture",
    title: "Maruša Kerpan, Automation Engineer @ Domel",
  },
  {
    id: 3,
    paragraph: '"Dogodkov Kluba Ada se udeležujem že od samega začetka.',
    emphasis:
      'Udeležba na delavnicah mi je dala priložnost, da se povežem z drugimi ženskami v tehnologiji, pridobim nova znanja in predvsem samozavest za nadaljevanje svoje kariere."',
    image: "/assets/jana-vovk.jpg",
    alt: "Jana Vovk profile picture",
    title: "Jana Vovk, Student @ FRI",
  },
  {
    id: 4,
    paragraph:
      '"Pred nekaj meseci sem potrebovala nasvet pri iskanju prve zaposlitve, in res, kapa dol za vso pomoč, podporo in nasvete, ki sem jih prejela. Tudi sami dogodki so odlično preživet čas v družbi ambicioznih in pozitivno naravnanih žensk v tehnologiji. Discord skupnost kluba Ada je prava zakladnica za vse, ki iščejo motivacijo, zaposlitev, izobraževanje ali pa samo dobro knjigo.',
    emphasis: 'Moja izkušnja s Klubom Ada je čista pozitiva!"',
    image: "/assets/nika-likar.jpeg",
    alt: "Nika Likar profile picture",
    title: "Nika Likar, UX Designer @ Omnia8",
  },
  {
    id: 5,
    paragraph:
      '"S pomočjo Kluba Ada sem izvedela za številne zanimive dogodke, ki so mi omogočili, da se družim in spletam nova prijateljstva z izjemnimi ženskami iz IT sveta. Nazadnje smo se srečale kar v Berlinu in skupaj preživele čudovit dan na konferenci.',
    emphasis:
      'Res je lep občutek biti del združenja, kjer te podpirajo podobno misleče ženske, ki te razumejo in spodbujajo."',
    image: "/assets/tamara-demir.jpeg",
    alt: "Tamara Demir profile picture",
    title: "Tamara Demir, Web Developer @ ENKI",
  },
];
export function Reviews() {
  return (
    <PageWrapper bgColor="bg-blue">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="max-w-sm md:max-w-2xl">
            <Heading size="lg">{"Izjave naših članic in partnerjev"}</Heading>
          </div>
          <div className="">
            <LinkButton size="md" variant="secondary" href="/partnerstvo">
              Postani partner
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
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
