<template>
  <main>

    <section class="hero">
      <div>
        <h2><span>Pridruži se nam</span> na naslednjem dogodku!</h2>
        <div class="narrow">

          <a href="https://forms.gle/kvwgZsTKaZVaLyJWA" target="_blank">
            <img src="@/assets/unnamed.png" alt="ZAKLJUČNI DOGODEK SEZONE">
          </a>
          <p class="">Najboljše smo prihranile za konec! 🚀</p>
          <p>Vabljene na zadnji dogodek te sezone z naslovom <br /><strong>Koda za uspeh: delavnica načrtovanja kariere
              v
              tehnologiji</strong>! ✨</p>
          <p>Dogodek se bo odvijal v</p>
          <ul>
            <li>📅 Torek, 21. 5. 2024</li>
            <li>⏰ Ob 17. uri</li>
            <li>📍Računalniški muzej, Celovška cesta 111, Ljubljana</li>
          </ul>

          <div class="button-wrapper">
            <a href="https://forms.gle/kvwgZsTKaZVaLyJWA" target="_blank" class="button">Pridruži se!</a>
          </div>

          <h3>
            Opis dogodka<span>:</span>
          </h3>
          <p>Na dogodku bomo ustvarile <strong>personaliziran karierni načrt</strong>, ki nam bo pomagal dosegati
            karierne cilje,
            olajšati pot do napredovanj in postati vodilna igralka v industriji! 💼 </p>
          <p>Pogovarjale se bomo z uspešnimi <strong>ženskami, ki delujejo na visokih položajih</strong> in so prav tako
            ustanovile/vodile skupino za ženske v tehnologiji, ter se podružile z gostjami iz preteklih dogodkov. 🎉</p>

          <h3>Program bo sestavljen iz treh delov<span>:</span></h3>
          <ol>
            <li>
              <strong><span>17.00 - 17.45</span> vodena delavnica</strong> na temo načrtovanja kariere - primeren za
              vse, od študentk
              do že zaposlenih
            </li>
            <li><strong><span>17.45 - 18.30</span> voden pogovor z uspešnimi ženskami iz področja tehnologije</strong>,
              ki so ustanovile/vodile skupino za ženske</li>
            <li><strong><span>18.30 - 20.00</span> druženje</strong> z gostjami iz preteklih dogodkov 🎈</li>
          </ol>

          <h3>V vodenem pogovoru bodo z nami:</h3>
          <ul>
            <li><a href="https://www.linkedin.com/in/ialja/" target="_blank">Alja Isaković</a>, CTO pri podjetju Tethix
              in ustanoviteljica CodeCatz</li>
            <li><a href="https://www.linkedin.com/in/88478734/" target="_blank">Biserka Cvetkovska</a>, General Manager
              pri podjetju tretton37,
              ustanoviteljica LeetLadies
            </li>
            <li><a href="https://www.linkedin.com/in/tamarastumperger/" target="_blank">Tamara Štumperger</a>, vodja
              sistema kakovosti dobaviteljev v podjetju
              Danfoss, članica
              skupine Women in
              STEM @Danfoss</li>
          </ul>

          <p>Ne zamudi priložnosti za načrtovanje uspešne kariere ter spoznavanje uspešnih žensk v industriji! ✨</p>

          <p>Število mest je omejeno, zato se čimprej prijavi! 🏃🏻‍♀️</p>

          <div class="button-wrapper">
            <a href="https://forms.gle/kvwgZsTKaZVaLyJWA" target="_blank" class="button">Prijavi se na dogodek!</a>
          </div>

        </div>
      </div>
    </section>

    <section id="organizatorji">
      <hr class="short-divider" />
      <div>
        <h1>
          <span>Klub Ada</span>
        </h1>
        <div class="description">
          <p><strong>smo skupnost študentk in strokovnjakinj iz tehničnih področij.</strong></p>
          <p class="color-lighter">Iniciativa za opolnomočenje in podporo žensk v tehnoloških karierah. Inženirke,
            razvijalke, podatkovne znanstvenice, oblikovalke in druge, podpiramo z viri, dogodki in izobraževanji.</p>
        </div>
        <div class="social-media">
          <a href="https://www.instagram.com/klub_ada/" target="_blank" class="instagram">
            <img alt="instagram logo" class="logo" src="@/assets/instagram.svg" />
          </a>
          <a href="https://www.linkedin.com/company/klub-ada/" target="_blank" class="linkedin">
            <img alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
          </a>
        </div>
      </div>
    </section>

    <section>
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
          <p class="color-lighter">Imaš še kakršnokoli vprašanje?<br />Piši nam na <a href="mailto:info@klub-ada.si"
              target="_blank">info@klub-ada.si</a>.</p>
        </div>
      </footer>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      "menuOpen": false
    }
  }
}
</script>

<style lang="scss" scoped>

section {
  padding-left: 20px;
  padding-right: 20px;
}

section>div, section>footer {
  max-width: 1160px;
  margin: auto;

  h2 {
    font-size: 40px;

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
  padding-top: 60px;
  padding-bottom: 60px;

  @media (min-width: 992px) {
    // padding-top: 115px;
    // padding-bottom: 115px;
  }

  // @media (min-width: 992px) {
  //   &>div:last-child {
  //     display: grid;
  //     grid-template-columns: 1fr 1fr;
  //     padding: 100px 0;
  //   }
  // }

  h2 {
    color: var(--color-light);
    font-size: 40px;
    line-height: 1;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;

    @media (min-width: 992px) {
      font-size: 60px;
    }

    span {
      color: var(--color-red);
    }
  }

  .narrow {
    max-width: 800px;
    margin: auto;

    img {
      max-width: 100%;
    }

    h3 {
      color: var(--color-red);
      font-size: 32px;
      margin: 20px 0;
  
      @media (min-width: 992px) {
        font-size: 40px;
      }
    }

    p {
      font-size: 20px;
      color: #BABBBD;
      margin: 20px 0;

      strong {
        color: white;
      }

      @media (min-width: 992px) {
        font-size: 26px;
      }
    }

    ul li,
    ol li {
      font-size: 20px;
      color: #BABBBD;
      margin: 20px 0;
      
      strong {
        color: white;
      }

      a {
        color: white;
        font-weight: 600;

        &:hover {
          color: var(--color-red);
        }
      }

      @media (min-width: 992px) {
        font-size: 26px;
      }
    }

    .button-wrapper {
      text-align: center;

      .button {
        display: inline-block;
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text);
        background-color: var(--color-red);
        text-decoration: none;
        margin: 20px 0;
        padding: 10px 20px;
        border-width: 2px;

        @media (min-width: 992px) {
          font-size: 30px;
          padding: 20px 40px;
          border-width: 4px;
          margin: 40px 0;
        }

        &:hover {
          color: var(--color-red);
          background-color: var(--color-text);
        }
      }
    }
  }
}

#organizatorji {
  padding-top: 40px;
  padding-bottom: 40px;

  @media (min-width: 992px) {
    // padding-top: 115px;
    // padding-bottom: 115px;
  }

  h1 {
    color: var(--color-light);
    font-size: 60px;
    line-height: 1;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;

    @media (min-width: 992px) {
      font-size: 93px;
      margin-bottom: 20px;
    }

    span {
      color: var(--color-red);
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
        // padding: 0 90px;
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
        width: 280px;
      }
    }
  }
}

footer {
  padding-top: 80px;
  padding-bottom: 40px;

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

      a {
        color: var(--color-light);
        font-weight: 600;
      }
    }
  }
}
</style>
