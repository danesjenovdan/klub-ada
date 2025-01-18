<template>
  <header>
    <div class="navigation">
      <div>
        <RouterLink to="/">
          <img alt="Klub Ada logo" class="logo" src="@/assets/logo.svg" />
        </RouterLink>
      </div>
      <div>
        <ul class="menu" :class="{ 'open': menuOpen }" @click="menuOpen = false">
          <!-- <li><a href="/">Domov</a></li> -->
          <li><a href="#zakaj">Zakaj se prijavi?</a></li>
          <li><a href="#agenda">Agenda</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="https://forms.gle/cmak5r8gjahw73AX7" class="button" target="_blank">Prijava</a></li>
        </ul>
        <span class="mobile-btn" @click="menuOpen = true">☰</span>
        <div class="overlay" :class="{ 'open': menuOpen }" @click="menuOpen = false"></div>
      </div>
    </div>
    
  </header>
  <main>
    <section class="hero">
      <div>
        <div>
          <h1>
            <span>Klub Ada</span> <br/> HEKATON 2023
          </h1>
          <p class="color-lighter">
            Pridruži se hekatonu in uporabi odprte podatke za družbeno koristno rešitev!
          </p>
          <p>
            <strong>15. december 2023 @ Outbrain</strong> (Dunajska cesta 5, Ljubljana)
          </p>
          <div>
            <a href="https://forms.gle/cmak5r8gjahw73AX7" class="button" target="_blank">Prijavi se zdaj!</a>
          </div>
        </div>
        <div class="graphics"></div>
      </div>
    </section>

    <section class="sponsors sponsors-golden">
      <div>
        <h4>Zlati sponzorji ❤️</h4>
        <a href="https://www.outbrain.com/" target="_blank">
          <img alt="Outbrain" class="logo" src="@/assets/sponsors/outbrain.png" />
        </a>
        <a href="https://celtra.com" target="_blank">
  				<img alt="Celtra" class="logo celtra" src="@/assets/sponsors/celtra.svg" />
  			</a>
        <a href="https://outfit7.com/" target="_blank">
          <img alt="Outfit7" class="logo" src="@/assets/sponsors/outfit7.png" />
        </a>
      </div>
    </section>

    <section id="organizatorji">
      <div>
        <h2>
          Kaj je Klub Ada<span>?</span>
        </h2>
        <div class="description">
          <p><strong>Skupnost študentk in strokovnjakinj iz tehničnih področij.</strong></p>
          <p class="color-lighter">Iniciativa za opolnomočenje in podporo žensk v tehnoloških karierah. Inženirke, razvijalke, podatkovne znanstvenice, oblikovalke in druge, podpiramo z viri, dogodki in izobraževanji.</p>
        </div>
        <div class="social-media">
          <a href="https://www.instagram.com/klub_ada/" target="_blank" class="instagram">
            <img alt="instagram logo" class="logo" src="@/assets/instagram.svg" />
          </a>
          <a href="https://www.linkedin.com/company/klub-ada/" target="_blank" class="linkedin">
            <img alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
          </a>
        </div>
        
        <hr class="short-divider" />
        <p><strong>V sodelovanju z ...</strong></p>
        <div class="djnd">
          <a href="https://danesjenovdan.si/" target="_blank">
            <img alt="Danes je nov dan logo" src="@/assets/sponsors/djnd.svg" />
          </a>
        </div>
        <p class="color-lighter">Danes je nov dan z razvijanjem digitalnih rešitev krepi aktivno državljanstvo, z odpiranjem in demokratizacijo javnih podatkov pa spodbuja transparentnost in nadzor nad delom odločevalk in odločevalcev.</p>
      </div>
    </section>

    <section class="sponsors sponsors-silver">
      <div>
        <h4>Srebrni sponzorji 🤍</h4>
        <a href="https://www.tretton37.com/" target="_blank">
            <img alt="Tretton37" class="logo" src="@/assets/sponsors/tretton37_blue.svg" />
          </a>
        <a href="https://sportradar.com/" target="_blank">
          <img alt="Sportradar" class="logo" src="@/assets/sponsors/sportradar.svg" />
        </a>
        <a href="https://infincube.com/" target="_blank">
            <img alt="infinCUBE" class="logo" src="@/assets/sponsors/infincube.svg" />
          </a>
        <!-- <a href="https://podatki.gov.si/" target="_blank">
      <img alt="Logo OPSI" class="logo" src="@/assets/sponsors/opsi.svg" />
    </a> -->
      </div>
    </section>

    <section id="zakaj">
      <div>
        <h2>
          Zakaj se prijavi<span>?</span>
        </h2>
        <div class="reasons">
          <div>
            <span>1</span>
            <h5>Mreženje in mentorstvo</h5>
            <p class="color-lighter">Izkoristi priložnost za mreženje z mentoricami in mentorji ter pridobivanje dragocenih nasvetov za tvojo karierno pot.</p>
          </div>
          <div>
            <span>2</span>
              <h5>Povezava z industrijo</h5>
              <p class="color-lighter">Nudimo priložnost, da se povežeš s tehnološkimi podjetji in uveljavljenimi strokovnjaki in strokovnjakinjami v industriji.</p>
          </div>
          <div>
            <span>3</span>
              <h5>Denarna nagrada</h5>
              <p class="color-lighter">Tekmuj za nagrado v vrednosti 1000 EUR in izpostavi svoje sposobnosti in ideje pred strokovno žirijo.</p>
          </div>
          <div>
            <span>4</span>
              <h5>Odkrivanje javnih podatkov</h5>
              <p class="color-lighter">Razišči možnosti odprtih podatkov in razvijaj rešitev, ki prispeva k družbenemu napredku.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="sponsors sponsors-golden">
      <div>
        <h4>Medijski partner 🖤</h4>
        <a href="https://www.youtube.com/@ogrodje" target="_blank">
          <img alt="Podcast Ogrodje" class="logo" src="@/assets/sponsors/ogrodje-logo.svg" />
        </a>
      </div>
    </section>

    <section id="agenda">
      <div>
        <h2>
          Agenda
        </h2>
        <hr />
        <div class="timeline">
          <div>
            <div class="pill"></div>
            <h6>SREDA</h6>
            <p>13. december</p>
            <hr class="short-divider" />
            <div class="timeslot">
              <p class="color-lighter">23:59</p>
              <p>Prijave se zaprejo</p>
            </div>
          </div>

          <div>
            <div class="pill"></div>
            <h6>PETEK</h6>
            <p>15. december</p>
            <hr class="short-divider" />
            <div class="timeslot">
              <p class="color-lighter">15:30 - 16:00</p>
              <p>Registracija</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">16:00</p>
              <p>Uvodni pozdrav</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">17:00 - 17:15</p>
              <p>Sestavljanje ekip</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">17:00</p>
              <p>Začetek dogodka</p>
            </div>

            <div class="timeslot">
                <p class="color-lighter">19:00</p>
                <p>Večerja</p>
              </div>

              <div class="timeslot">
                <p class="color-lighter">20:00</p>
                <p>Zabavna aktivnost + nagrada</p>
              </div>
          </div>

          <div>
            
            <div class="pill"></div>
            <h6>SOBOTA</h6>
            <p>16. december</p>
            <hr class="short-divider" />
            <div class="timeslot">
              <p class="color-lighter">00:00</p>
              <p>Polnočni prigrizek</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">7:00 - 9:00</p>
              <p>Zajtrk</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">10:00 - 10:30</p>
              <p>Delavnica "How to pitch?"</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">13:00</p>
              <p>Kosilo</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">17:00 - 18:00</p>
              <p>Predstavitve rešitev</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">18:00</p>
              <p>Večerja</p>
            </div>

            <div class="timeslot">
              <p class="color-lighter">19:00</p>
              <p>Razglasitev zmagovalcev</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="nagrade">
      <div>
        <h2>
          Nagradni sklad<span>.</span>
        </h2>
        <div class="rewards">
          <div>
            <p>1. MESTO</p>
            <p>1000 EUR</p>
          </div>
        </div>
      </div>
    </section>

    <section id="faq">
      <div>
        <h2>
          FAQ
        </h2>
        <div class="questions">
          <hackathon-question>
            <template #question>
              Kako deluje hekaton?
            </template>
            <template #answer>
              <ol>
                <li>Če se želiš udeležiti hekatona, se moraš najprej prijaviti <a href="https://forms.gle/cmak5r8gjahw73AX7" target="_blank">tukaj</a> do 13. decembra. Lahko se prijaviš kot ekipa ali kot posameznik/posameznica in na dogodku sestavimo ekipo.</li>
                <li>Hekaton se začne 15. decembra ob 15:30. Udeleženci in udeleženke bodo oblikovali ekipe in imeli 24 ur časa, da razvijejo inovativno rešitev z uporabo odprtih podatkov.</li>
              </ol>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Kdo se lahko prijavi?
            </template>
            <template #answer>
              <p>Odprto je za vse posameznike in posameznice, ki jih navdušuje tehnologija, inovacije in se želijo preizkusiti v izzivu.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Katere veščine so potrebne?
            </template>
            <template #answer>
              <p>Odprto je za udeležence in udeleženke s širokim spektrom znanj. Ključni atribut pri tem je »motivacija za inoviranje«. Natančneje, iščemo navdušence nad trajnostjo, inovatorje, inženirke in inženirje, programerke in programerje, podatkovne znanstvenice, oblikovalce, študente in študentke. Delo bo potekalo v skupinah, ki bodo združevale udeležence z različnimi veščinami.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Ali potrebujem idejo za sodelovanje?
            </template>
            <template #answer>
              <p>Ne. Ideje so dobrodošle, vendar niso obvezne. Ekipe se lahko oblikujejo okoli interesov na dogodku.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Kako deluje oblikovanje ekip?
            </template>
            <template #answer>
              <p>Če imaš ekipo, se preprosto prijavi na hekaton in tekmuj za zmago.</p>
              <p>Če je še nimaš, pa bomo na dogodku povezali udeležence in udeleženke s podobnimi zanimanji in idejami.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Kakšna je velikost ekipe?
            </template>
            <template #answer>
              <p>Velikost ekip je prilagodljiva, 2-4 osebe. Ker se morate usklajevati znotraj svoje ekipe, priporočamo obvladljivo velikost ekipe do 4 člane, da bo učinkovita. Če razmišljate o prijavi s prijatelji/ekipo, vseeno priporočamo, da ostane ekipa odprta za nove potencialne člane in članice. Presenečeni boste nad rezultati, ki jih boste dosegli ob koncu hekatona!</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Katera orodja se uporabljajo med hekatonom?
            </template>
            <template #answer>
              <p>Uporabijo se lahko orodja in tehnologija po lastni izbiri.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              Kakšna podpora bo na voljo med hekatonom?
            </template>
            <template #answer>
              <p>Izbrali smo odlične mentorje in mentorice, ki bodo sodelovali z ekipami skozi hekaton. To so strokovnjaki in strokovnjakinje iz industrije, poznavalke podatkov, podjetniki, inženirke, programerji.</p>
            </template>
          </hackathon-question>
          <hackathon-question>
            <template #question>
              To bo moj prvi hekaton. Kaj so in kako delujejo?
            </template>
            <template #answer>
              <p>Hekatoni so intenzivni, sodelovalni dogodki, kjer udeleženci in udeleženke skupaj razvijajo inovativne rešitve z ekipnim delom in mentorsko podporo v določenem časovnem okviru, v tem primeru 24 ur. Organizatorke vas bodo vodile skozi vse korake hekatona, od ideje do mentorstva in končne predstavitve pred žirijo za izbor zmagovalcev in zmagovalk.</p>
            </template>
          </hackathon-question>
        </div>
        <footer>
          <div class="newsletter">
            <p><strong>Prijavi se na Klub Ada novičke in prejmi vabila na naslednje dogodke, hekatone, itd.</strong></p>
            <div class="ml-embedded" data-form="14J8zj"></div>
          </div>
          <div class="instagram">
            <div>
              <a href="https://www.instagram.com/klub_ada/" target="_blank">
                <img alt="instagram logo" class="logo" src="@/assets/instagram.svg" />
              </a>
            </div>
            <p class="color-lighter">Imaš še kakršnokoli vprašanje?<br />Piši nam na <a href="mailto:info@klub-ada.si" target="_blank">info@klub-ada.si</a>.</p>
          </div>
        </footer>
        <div class="mju">
          <img alt="Logo Ministrstva za javno upravo" class="logo" src="@/assets/sponsors/mju-logo-white.svg" />
          <p>Projekt sofinancira Ministrstvo za javno upravo iz Sklada za NVO.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import HackathonQuestion from '../components/HackathonQuestion.vue'

export default {
  components: {
    HackathonQuestion,
  },
  data() {
    return {
      "menuOpen": false
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  max-width: 1160px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: auto;

  @media (min-width: 992px) {
    padding: 20px 0;
    align-items: center;
  }

  .logo {
    height: 60px;
  }

  ul {
    list-style: none;
    padding: 0;

    @media (min-width: 992px) {
      padding: 20px 0;
    }

    li {
      display: block;

      @media (min-width: 992px) {
        display: inline-block;
      }

      a {
        display: block;
        padding: 10px 40px;
        font-size: 18px;
        color: var(--color-text);
        text-decoration: none;
        line-height: 1;
      }

      .button {
        color: var(--color-red);
      }
      
    }
  }

  .mobile-btn {
    display: none;
    cursor: pointer;
  }

  @media (max-width: 992px) {
    .menu {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      background-color: var(--color-dark);
      width: 0;
      height: 100%;
      z-index: 3;
      transition: all 200ms ease-in-out;
      text-align: center;
      overflow: hidden;
    }

    .menu.open {
      transform: translateX(0);
      width: 300px;
    }

    .menu li {
      display: block;
      padding: 10px 30px;
      width: 300px;

      &:first-child {
        padding-top: 30px;
      }
    }

    .menu li.close {
      display: block;
      text-align: right;
    }

    .mobile-btn {
      display: inline-block;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0,0,0,.4);
      opacity: 0;
      z-index: -1;
      transition: opacity 100ms linear;
    }

    .overlay.open {
      z-index: 1;
      opacity: 1;
    }
  }
}

section {
  padding-left: 20px;
  padding-right: 20px;
}

section > div {
  max-width: 1160px;
  margin: auto;

  h2 {
    font-size: 40px;
    margin-bottom: 30px;

    @media (min-width: 992px) {
      font-size: 93px;
      margin-bottom: 80px;
    }

    span {
      color: var(--color-red);
    }
  }
}

.hero {
  &>div {
    padding: 40px 0;

    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 100px 0;
    }

  }
  h1 {
    color: var(--color-light);
    font-size: 60px;
    line-height: 1;
    font-weight: 600;

    @media (min-width: 992px) {
      font-size: 93px;
    }

    span {
      color: var(--color-red);
    }
  }

  p {
    font-size: 20px;
    margin: 20px 0;

    @media (min-width: 992px) {
      font-size: 32px;
      margin: 40px 0;
    }
  }
  
  .button {
    display: inline-block;
    font-size: 24px;
    color: var(--color-text);
    background-color: var(--color-red);
    text-decoration: none;
    margin-bottom: 40px;
  }
  .graphics {
    background-image: url("@/assets/intro.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: none;
  }

  @media (min-width: 992px) {
    font-size: 32px;
    margin: 40px 0;

    .graphics {
      display: block;
    }
  }
}

.sponsors {
  padding: 0;
  overflow-x: scroll;
  background-color: var(--color-light);
  border-top: 10px solid var(--color-red);
  border-bottom: 10px solid var(--color-red);

  h4 {
    color: var(--color-dark);
    text-align: center;
    font-size: 32px;
    font-family: 'Anaheim', sans-serif;
  }

  &>div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 65px 0;
    width: 1160px;

    @media (min-width: 992px) {
      padding: 65px 0;
    }
  }

  &.sponsors-golden {
    img {
      width: 200px;
      margin: 0 20px;

      @media (min-width: 992px) {
        width: 240px;
        margin: 0 40px;

        &.celtra {
          width: 180px;
        }
      }
    }
  }

  &.sponsors-silver {
    h4 {
      font-size: 32px;
    }

    img {
      width: 160px;
      margin: 0 20px;

      @media (min-width: 992px) {
        width: 200px;
        margin: 0 40px;
      }
    }
  }
}

#organizatorji {
  padding-top: 60px;
  padding-bottom: 60px;

  @media (min-width: 992px) {
    padding-top: 115px;
    padding-bottom: 115px;
  }

  h2 {
    margin-bottom: 30px;
    text-align: center;

    @media (min-width: 992px) {
      margin-bottom: 60px;
    }
  }

  p {
    font-size: 20px;
    text-align: center;
    
    @media (min-width: 992px) {
      font-size: 26px;
      padding: 0 90px;
    }

    strong {
      font-size: 20px;
      font-weight: 600;

      @media (min-width: 992px) {
        font-size: 26px;
        padding: 0 90px;
      }
    }
  }

  .social-media {
    text-align: center;

    &>a {
      display: inline-block;
      margin: 40px 20px 0;

      img {
        width: 40px;
      }
    }
  }

  .short-divider {
    margin: 50px auto;
  }

  .djnd {
    text-align: center;
    margin: 30px auto;

    a {
      display: inline-block;

      img {
        width: 200px;

        @media (min-width: 992px) {
          width: 280px;
        }
      }
    }
  }
}

#zakaj {
  background-image: url("@/assets/zakaj.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 60px 0;

  @media (min-width: 992px) {
    padding: 140px 0;
  }

  &>div {
    padding: 40px;
    background-color: var(--color-dark);

    @media (min-width: 992px) {
      padding: 115px;
    }
  }

  h2 {
    text-align: center;
  }

  .reasons {
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 90px;
    }

    span {
      background-color: var(--color-red-light);
      font-size: 20px;
      font-weight: 700;
      color: #1E1E1E;
      display: inline-block;
      width: 90px;
      line-height: 30px;
      border-radius: 50px;
      text-align: center;

      @media (min-width: 992px) {
        font-size: 30px;
        width: 140px;
        line-height: 40px;
        border-radius: 70px;
      }
    }

    h5 {
      font-size: 20px;
      font-weight: 600;
      color: var(--color-light);
      margin: 20px 0 10px 0;

      @media (min-width: 992px) {
        font-size: 31px;
      }
    }

    p {
      font-size: 20px;
      margin-bottom: 40px;

      @media (min-width: 992px) {
        font-size: 30px;
      }
    }
  }
}

#agenda {
  padding-top: 60px;
  padding-bottom: 60px;

  @media (min-width: 992px) {
    padding: 115px;
  }

  h2 {
    margin-bottom: 40px;

    @media (min-width: 992px) {
      margin-bottom: 90px;
    }
  }

  .timeline {
    
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 80px;
    }

    &>div {
      position: relative;
    }

    hr {
      margin: 20px 0;
    }

    .pill {
      width: 55px;
      height: 31px;
      border-radius: 27px;
      background-color: var(--color-red-light);
      position: absolute;
      top: -16px;
      display: none;

      @media (min-width: 992px) {
        display: block;
      }
    }

    h6 {
      margin-top: 60px;
      color: var(--color-red);
      font-size: 22px;
    }

    h6 + p {
      font-size: 24px;
      font-weight: 600;

      @media (min-width: 992px) {
        font-size: 31px;
      }
    }

    .timeslot {
      margin-top: 20px;

      @media (min-width: 992px) {
        margin-top: 40px;
      }

      p {
        font-size: 20px; 

        @media (min-width: 992px) {
          font-size: 26px;
        }
      }

      p:last-child {
        font-weight: 600;
      }
    }
  }
}

#nagrade {
  background-image: url("@/assets/nagrada.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 60px 0;

  @media (min-width: 992px) {
    padding: 140px 0;
  }

  &>div {
    padding: 40px;
    background-color: var(--color-dark);

    @media (min-width: 992px) {
      padding: 115px;
    }
  }

  h2 {
    text-align: center;
  }

  .rewards {
    display: flex;
    justify-content: center;

    &>div {
      background-color: var(--color-red);
      padding: 50px;
      text-align: center;

      p:first-child {
        font-size: 22px;
      }
      p:last-child {
        font-size: 50px;
        font-weight: 600;
      }
    }
  }
}

#faq {
  background-image: linear-gradient(180deg, #191F25 0%, rgb(56, 62, 69) 100%);

  h2 {
    margin-top: 60px;
    margin-bottom: 30px;

    @media (min-width: 992px) {
      margin-top: 110px;
    }
  }

  .questions {
    border-top: 2px solid rgba(255, 255, 255, 0.7);
    margin-bottom: 160px;
  }

  a {
    color: var(--color-light);
    font-weight: 600;
  }

  footer {
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 80px;
    }

    .newsletter {
      p {
        margin-bottom: 60px;
      }
    }

    .instagram {
      display: flex;
      flex-direction: column;
      justify-content: end;
      text-align: center;
      margin-top: 40px;

      @media (min-width: 992px) {
        text-align: end;
        margin-top: 0;
      }

      a {
        display: inline-block;
        margin-bottom: 20px;

        img {
          width: 40px;
        }
      }

      p {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }

  .mju {
    display: flex;
    align-items: center;
    padding: 50px 0;
    flex-direction: column;
    text-align: center;

    @media (min-width: 992px) {
      flex-direction: row;
      align-items: end;
      justify-content: center;
    }

    img {
      width: 270px;
      margin-bottom: 20px;
      
      @media (min-width: 992px) {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }

    p {
      font-size: 18px;
    }
  }
}

</style>
