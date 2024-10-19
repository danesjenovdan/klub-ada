<template>
  <main>
    <section class="hero">
      <h3>Kako je nastal Klub Ada</h3>
      <div class="row">
        <div><img src="@/assets/ekipa/ada_team.jpg" alt="Klub Ada team" /></div>
        <div>
          <p>Klub Ada je nastal iz želje po povezovanju žensk v tehnologiji. Na tem področju smo v marsikaterem prostoru
            edine ženske, kar prinaša specifične strahove, težave in dileme, zaradi katerih pogosto občutimo, da v ta
            prostor ne spadamo. V Klubu Ada želimo z našimi aktivnostmi navdušiti ženske nad tehnologijo, se med seboj
            povezovati ter poudariti, da je tehnologija prostor, kamor spadamo in kjer je naše mnenje dobrodošlo.
          </p>
          <br />
          <p>Ime kluba je navdihnila Ada Lovelace - matematičarka, pisateljica in pionirka na področju računalništva. V
            19. stoletju je za analitični stroj Charlesa Babbaga, ki velja za prvi računalnik, zapisala prvi algoritem.
            Zaradi tega dosežka jo danes poznamo kot prvo programerko!
          </p>
        </div>
      </div>
    </section>
    <section class="hero">
      <h3>Ekipa</h3>
      <div class="imageList">
        <div class="imageItem">
          <img class="person" src="@/assets/ekipa/simona.png" alt="Simona" />
          <div class="nameWithIcon">
            <p>Simona</p>
            <a href="https://www.linkedin.com/in/simonakek/" target="_blank" class="linkedin">
              <img width="16" height="16" alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
            </a>
          </div>
        </div>
        <div class="imageItem">
          <img class="person" src="@/assets/ekipa/kaja.jpg" alt="Kaja" />
          <div class="nameWithIcon">
            <p>Kaja</p>
            <a href="https://www.linkedin.com/in/kajaskerlj/" target="_blank" class="linkedin">
              <img width="16" height="16" alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
            </a>
          </div>
        </div>
        <div class="imageItem">
          <img class="person" src="@/assets/ekipa/patricija.jpg" alt="Patricija" />
          <div class="nameWithIcon">
            <p>Patricija</p>
            <a href="https://www.linkedin.com/in/patricijabrecko/" target="_blank" class="linkedin">
              <img width="16" height="16" alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
            </a>
          </div>
        </div>
        <div class="imageItem"><img class="person" src="@/assets/ekipa/eva.jpg" alt="Eva" />
          <div class="nameWithIcon">
            <p>Eva</p>
            <a href="https://www.linkedin.com/in/eva-vidmar/" target="_blank" class="linkedin">
              <img width="16" height="16" alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
            </a>
          </div>
        </div>
        <div class="imageItem"><img class="person" src="@/assets/ekipa/neza.jpeg" alt="Neza" />
          <div class="nameWithIcon">
            <p>Neža</p>
            <a href="https://www.linkedin.com/in/nezadukic/" target="_blank" class="linkedin">
              <img width="16" height="16" alt="linkedin logo" class="logo" src="@/assets/linkedin.svg" />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <h3>Bi rada sodelovala tudi ti?</h3>
      <p class="centeredText">Če te zanima organizacija zabavnih aktivnosti v super ekipi, nam piši na <a
          href="mailto:info@klub-ada.si" target="_blank">info@klub-ada.si</a>! 🎉</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
section {
  padding-left: 32px;
  padding-right: 32px;
}

section>div {
  max-width: 1160px;
  margin: auto;
}

.row {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 32px;
  align-items: center;
  justify-content: center;

  @media (min-width: 992px) {
    flex-direction: row;
  }

  p {
    font-size: 20px;
    padding-inline: 24px;
    text-align: center;

    @media (min-width: 992px) {
      flex-direction: row;
      text-align: left;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
}

h4 {
  color: var(--color-red);
}

.row>div {
  flex: 1;
}

.hero {
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

.imageList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (min-width: 992px) {
    gap: 48px;
  }
}

.imageItem {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  img.person {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
  }
}

.centeredText {
  text-align: center;
}

.nameWithIcon {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>