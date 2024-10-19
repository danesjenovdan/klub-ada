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
    <section class="section">
      <h4>Zakaj postati partner?</h4>
      <p>V Klubu Ada verjamemo, da je povezovanje ključ do rasti in uspeha. Naša prizadevanja za spodbujanje žensk v
        tehnologiji se ne bi mogla uresničiti brez podpore partnerjev, ki delijo naše vrednote in vizijo.
      </p>
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

  @media (min-width: 944px) {
    flex-wrap: nowrap;
  }
}

.whiteSquare {
  background-color: var(--color-light);
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
    color: white;
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