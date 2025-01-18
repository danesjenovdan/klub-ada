<template>
  <main>
    <section class="section">
      <h3>Partnerstvo</h3>
      <p>V Klubu Ada verjamemo, da je povezovanje ključ do rasti in uspeha. Naša prizadevanja za spodbujanje žensk v
        tehnologiji se ne bi mogla uresničiti brez podpore partnerjev, ki delijo naše vrednote in vizijo.
      </p>
      <br />
      <p>S tem, ko nas podprete, pridobite priložnost, da postanete del skupnosti, ki si prizadeva za večjo
        enakopravnost in reprezentativnost žensk v tehnoloških poklicih. Vaša podpora nam omogoča:
      </p>
      <div class="row">
        <div class="whiteSquare">
          <h4>Povečanje prepoznavnosti</h4>
          <p>S sodelovanjem z nami se boste povezali z omrežjem žensk in
            moških, ki verjamejo v enakopravnost, ter s tem okrepili svojo blagovno znamko kot družbeno odgovorno
            organizacijo.</p>
        </div>
        <div class="whiteSquare">
          <h4>Učinkovitejše doseganje ciljev</h4>
          <p>Skupaj lahko razvijamo in izvajamo aktivnosti, ki
            nagovarjajo izzive, s katerimi se srečujejo ženske v tehnologiji, ter jih spodbujamo, da se vključijo v to
            področje.</p>
        </div>
        <div class="whiteSquare">
          <h4>Ustvarjanje pozitivnega vpliva</h4>
          <p>Vaša podpora bo omogočila dostop do izobraževalnih
            delavnic, mentorstva in mrežnih priložnosti, ki bodo pomagale ženskam, da se razvijejo in uspevajo v
            tehnologiji.</p>
        </div>
      </div>
    </section>
    <section class="section fullWidthSection">
      <div>
        <h4>Zakaj postati partner?</h4>
        <p>V Klubu Ada verjamemo, da je povezovanje ključ do rasti in uspeha. Naša prizadevanja za spodbujanje žensk v
          tehnologiji se ne bi mogla uresničiti brez podpore partnerjev, ki delijo naše vrednote in vizijo.
        </p>
        <div class="row rowCentered">
          <img src="@/assets/socials.svg" alt="Socialna omrežja" />
          <div>
            <h4>Naše platforme vključujejo:
            </h4>
            <br />
            <ul>
              <li>
                <strong>Družbena omrežja </strong>(Instagram, LinkedIn)
              </li>
              <li>
                <strong>Spletna skupnost </strong>(Discord)
              </li>
              <li>
                <strong>Novičnik </strong>z rednimi posodobitvami in novicami
              </li>
              <li>
                <strong>Spletna stran</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div>
        <br />
        <h4>
          Možnosti sodelovanja:
        </h4>
        <br />
        <ul>
          <li>
            <strong>Povezovanje s skupnostjo: </strong>Partnerji se lahko povežejo z našo aktivno skupnostjo tehnoloških
            navdušenk in strokovnjakinj.
          </li>
          <li>
            <strong>Promocija: </strong>Vaš logotip in predstavitev bodo vidni na naših platformah.
          </li>
          <li>
            <strong>Zaposlovanje: </strong>Možnost objave zaposlitvenih oglasov na naših platformah.
          </li>
          <li>
            <strong>Sodelovanje na dogodkih: </strong>Partnerji se lahko predstavijo na dogodkih in sodelujejo pri
            oblikovanju vsebin.
          </li>
          <li>
            <strong>Promocijski materiali: </strong> Na dogodkih lahko delite svoj promocijski material.
          </li>
          <li>
            <strong>Promocija dogodkov: </strong>Podpora pri promociji vaših dogodkov (konference, webinarji, karierni
            dogodki) na naših platformah.
          </li>
          <li>
            <strong>Druge oblike sodelovanja po dogovoru.</strong>
          </li>
        </ul>
      </div>
    </section>
    <section class="section fullWidthSection">
      <div>
        <h4>Kdo lahko postane partner?</h4>
        <p>Partner Kluba Ada lahko postane vsako podjetje, organizacija ali posameznik, ki podpira našo vizijo in si
          želi prispevati k večji vključenosti žensk v tehnologiji. Iščemo partnerje, ki si želijo sodelovati pri
          krepitvi tehnološke skupnosti, spodbujanju talentov ter ustvarjanju priložnosti za izobraževanje in
          zaposlovanje. Sodelovanje je odprto za podjetja vseh velikosti, nevladne organizacije, izobraževalne ustanove
          ter tehnološke skupine in posameznike, ki želijo deliti svoje znanje in izkušnje.
        </p>
        <br />
        <strong>Vas zanima sodelovanje? Za več informacij nam lahko pišete na <a href="mailto:info@klub-ada.si"
            target="_blank">info@klub-ada.si</a>
        </strong>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
section {
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1160px;
  margin: auto;
}

strong {
  font-weight: 600;
}

.fullWidthSection {
  width: 100%;
  max-width: unset;
  background-color: var(--color-light);

  li {
    color: var(--color-dark);
  }
}

.fullWidthSection>div {
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1160px;
  margin: auto;
}

h4 {
  color: var(--color-red);
  font-size: 32px;
  margin-bottom: 16px;
}

.row {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 32px;
  margin-bottom: 32px;

  @media (min-width: 944px) {
    flex-wrap: nowrap;
  }
}

.rowCentered {
  justify-content: center;
}

.whiteSquare {
  background-color: var(--color-light);
  border: 2px solid var(--color-dark);
  border-radius: 8px;
  color: var(--color-dark);
  padding: 32px;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;

  h4 {
    color: var(--color-dark);
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }
}

.section {
  a {
    color: var(--color-red);
    font-weight: 600;

    &:hover {
      color: var(--color-red);
    }
  }

  padding-top: 60px;
  padding-bottom: 60px;

  h3 {
    color: var(--color-red);
    font-size: 32px;
    line-height: 1;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;

    @media (min-width: 992px) {
      font-size: 48px;
    }
  }
}

.centeredText {
  text-align: center;
}
</style>