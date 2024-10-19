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
          <p>Ime kluba je navdihnila Ada Lovelace – matematičarka, pisateljica in pionirka na področju računalništva. V
            19. stoletju je za analitični stroj Charlesa Babbaga, ki velja za prvi računalnik, zapisala prvi algoritem.
            Zaradi tega dosežka jo danes poznamo kot prvo programerko!
          </p>
        </div>
      </div>
    </section>
    <section class="hero">
      <h3>Ekipa</h3>
      <div class="imageList">
        <div class="imageItem"><img src="@/assets/ekipa/simona.png" alt="Simona" />
          <p>Simona</p>
        </div>
        <div class="imageItem"><img src="@/assets/ekipa/kaja.jpg" alt="Kaja" />
          <p>Kaja</p>
        </div>
        <div class="imageItem"><img src="@/assets/ekipa/patricija.jpg" alt="Patricija" />
          <p>Patricija</p>
        </div>
        <div class="imageItem"><img src="@/assets/ekipa/eva.jpg" alt="Eva" />
          <p>Eva</p>
        </div>
        <div class="imageItem"><img src="@/assets/ekipa/neza.jpeg" alt="Neza" />
          <p>Neža</p>
        </div>
      </div>
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

.row>div {
  flex: 1;
}

.hero {
  padding-top: 60px;
  padding-bottom: 60px;

  h3 {
    color: var(--color-red);
    font-size: 32px;
    line-height: 1;
    font-weight: 500;
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

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
  }
}
</style>