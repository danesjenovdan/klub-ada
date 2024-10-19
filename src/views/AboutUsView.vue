<template>
  <main>
    <section class="hero">
      <h2>O naši ekipi</h2>
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
  padding-left: 20px;
  padding-right: 20px;
}

section>div {
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

  h2 {
    color: var(--color-red);
    font-size: 40px;
    line-height: 1;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;

    @media (min-width: 992px) {
      font-size: 60px;
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