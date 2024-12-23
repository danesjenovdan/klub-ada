<template>
  <main>
    <section class="hero-image">
      <img src="@/assets/hero-image.jpg" alt="" />
    </section>

    <section class="hero">
      <div>
        <h1>
          <span>Skupnost žensk</span><br />
          v tehnologiji
        </h1>
        <p>
          <strong
            >Klub Ada je skupnost žensk v tehnologiji, ki povezuje dijakinje,
            študentke, zaposlene in vse, ki jih to področje zanima. Organiziramo
            dogodke, ki so namenjeni mreženju in deljenju znanja iz področje
            tehnologije, kariernega in osebnega razvoja.</strong
          >
        </p>
      </div>
      <div class="social-media">
        <a
          href="https://www.instagram.com/klub_ada/"
          target="_blank"
          class="instagram"
        >
          <img alt="instagram logo" class="logo" src="@/assets/instagram.svg" />
        </a>
        <a
          href="https://www.linkedin.com/company/klub-ada/"
          target="_blank"
          class="linkedin"
        >
          <img alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
        </a>
      </div>
      <hr class="short-divider" />
    </section>

    <section class="sponsors">
      <h2>Hvala partnerjem, ki nas podpirajo:</h2>
      <div>
        <img
          alt="Celtra logo"
          class="logo"
          src="@/assets/sponsors/celtra.svg"
        />
        <img
          alt="Impact Hub Ljubljana logo"
          class="logo"
          src="@/assets/sponsors/impact-hub.png"
        />
        <img alt="FRI logo" class="logo" src="@/assets/sponsors/fri.png" />
      </div>
      <hr class="short-divider" />
    </section>

    <section class="next-event">
      <h2>Pridruži se nam na naslednjem dogodku!</h2>
    </section>

    <section class="next-event">
      <div>
        <img
          src="@/assets/pretekli-dogodki/TejaSavs.jpg"
          alt="Portret Teje Šavs."
        />
      </div>
      <div>
        <p class="small">19. 11. 2024 ob 17:00 @ FRI v P18</p>
        <h3>Vodenje v tehnološkem podjetju</h3>
        <p>
          Te zanima kako vodja spremlja uspešnost svojih zaposlenih? Kako izbere
          člane ekipe glede na projekt?
        </p>
        <p>
          Vabljena na novembrski dogodek, kjer bomo gostile tehnološko
          direktorico <strong>Tejo Šavs</strong> iz podjetja
          <strong>Outfit7</strong>!
        </p>

        <div class="button-wrapper">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfNWByisvH-7MQdbzo03EyUgSNchYDwlhBOxuSxLGHfb66jhw/viewform"
            target="_blank"
            class="button"
            >Pridruži se!</a
          >
        </div>
      </div>
    </section>

    <!-- <section>
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
    </section> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
// section,
// section>footer {
//   max-width: 1160px;
//   margin: auto;

//   h2 {
//     font-size: 35px;

//     @media (min-width: 992px) {
//       font-size: 93px;
//       margin-bottom: 80px;
//     }

//     span {
//       color: var(--color-red);
//     }
//   }
// }

.hero-image img {
  width: 100%;
  height: 70vh;
  object-fit: cover;
  object-position: center;
}

.sponsors {
  margin-top: 100px;
  width: 100%;
  .short-divider {
    margin-top: 100px;
    margin-bottom: 40px;
  }
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 32px;
  gap: 64px;
  h2 {
    font-weight: 500;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 48px;
    img {
      height: 120px;
    }
    @media (min-width: 992px) {
      // padding-top: 115px;
      // padding-bottom: 115px;
    }
  }
}

.hero {
  margin-top: 80px;
  padding-left: 32px;
  padding-right: 32px;

  @media (min-width: 992px) {
    // padding-top: 115px;
    // padding-bottom: 115px;
  }

  h1 {
    color: var(--color-dark);
    font-size: 38px;
    line-height: 1;
    text-align: center;
    margin-bottom: 60px;

    @media (min-width: 992px) {
      font-size: 60px;
      margin-bottom: 60px;
    }

    span {
      color: var(--color-red);
      font-weight: 600;
      font-size: 48px;

      @media (min-width: 992px) {
        font-size: 72px;
        margin-bottom: 20px;
      }
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

    & > a {
      display: inline-block;
      margin: 40px 20px 0;

      img {
        width: 40px;
      }
    }
  }

  .short-divider {
    margin: 100px auto;
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

.next-event {
  max-width: 1160px;
  margin: 60px auto;
  padding-left: 32px;
  padding-right: 32px;

  > div:first-child {
    img {
      max-width: 100%;
    }
  }

  @media (min-width: 992px) {
    > div:last-child {
      margin-left: 40px;
    }
  }

  p {
    font-size: 20px;
    margin-bottom: 20px;

    strong {
      font-weight: 700;
    }

    @media (min-width: 992px) {
      font-size: 28px;
    }
  }

  p.small {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 700;
  }

  h2 {
    font-weight: 500;
    margin: auto;
  }

  h3 {
    color: var(--color-red);
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  @media (min-width: 992px) {
    display: flex;

    > div:first-child {
      img {
        max-width: 500px;
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
        color: var(--color-red);
        font-weight: 600;
      }
    }
  }
}
</style>
