<template>
  <header>
    <div class="navigation">
      <div>
        <RouterLink to="/"><img alt="Klub Ada logo" class="logo" src="@/assets/newlogo.png" /></RouterLink>
      </div>
      <div>
        <ul class="menu" :class="{ 'open': menuOpen }" @click="menuOpen = false">
          <!-- <li>
            <RouterLink to="/hekaton">Hekaton 2023</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/o-nas">O nas</RouterLink>
          </li>
          <li>
            <RouterLink to="/aktivnosti">Aktivnosti</RouterLink>
          </li>
          <!-- <li>
            <RouterLink to="/dogodki">Dogodki</RouterLink>
          </li> -->
          <li>
            <RouterLink to="/partnerstvo">Partnerstvo</RouterLink>
          </li>
          <li>
            <RouterLink to="/dogodki" class="button">Dogodki 🗓️</RouterLink>
          </li>
          <!-- <li><a href="https://linktr.ee/klubada" target="_blank" class="button">Prihajajoče aktivnosti 🗓️</a></li> -->
        </ul>
        <span class="mobile-btn" @click="menuOpen = true">☰</span>
        <div class="overlay" :class="{ 'open': menuOpen }" @click="menuOpen = false"></div>
      </div>
    </div>

  </header>
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
@media (min-width: 992px) {
  header {
    position: sticky;
    top: 0;
    background-color: var(--color-light);
    border-bottom: 2px solid var(--color-dark);
  }
}


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
        padding: 10px 20px;
        font-size: 18px;
        color: var(--color-text);
        text-decoration: none;
        line-height: 1;
        font-weight: 600;
      }

      .button {
        color: var(--color-light);
        padding: 12px 30px;
        margin-left: 20px;
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
      background-color: var(--color-light);
      width: 0;
      height: 100%;
      z-index: 3;
      transition: all 200ms ease-in-out;
      text-align: center;
      overflow: hidden;
    }

    .menu.open {
      transform: translateX(0);
      width: 100%;
    }

    .menu li {
      display: block;
      padding: 10px 30px;
      width: 100%;

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
      background-color: rgba(0, 0, 0, 0.4);
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
</style>
