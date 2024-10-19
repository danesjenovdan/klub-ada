<template>
  <main>
    <section class="section">
      <h3>Aktivnosti</h3>
    </section>
    <section class="section fullWidthSection">
      <div>
        <h4>Pretekli dogodki</h4>
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