<template>
  <div class="question" @click="open = !open">
    <h6>
      <slot name="question"></slot>
    </h6>
    <div class="plus" :class="{'open': open}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.54583 12.5635H11.1413V17.1589C11.1413 17.626 11.5255 18.0177 12.0001 18.0177C12.4747 18.0177 12.8589 17.626 12.8589 17.1589V12.5635H17.4543C17.9214 12.5635 18.3131 12.1793 18.3131 11.7047C18.3131 11.2301 17.9214 10.8458 17.4543 10.8458H12.8589V6.25042C12.8589 5.78334 12.4747 5.3916 12.0001 5.3916C11.5255 5.3916 11.1413 5.78334 11.1413 6.25042V10.8458H6.54583C6.07875 10.8458 5.68701 11.2301 5.68701 11.7047C5.68701 12.1793 6.07875 12.5635 6.54583 12.5635Z" fill="white"/>
      </svg> 
    </div>
  </div>
  <div class="answer color-lighter" :class="{'show': open}">
    <slot name="answer"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      "open": false
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
}

h6 {
  font-size: 20px;
  font-weight: 700;
  margin: 24px 0;

  @media (min-width: 992px) {
    font-size: 26px;
  }
}

.plus {
  height: 24px;
  width: 24px;
  transition: 0.2s ease-in-out;

  &.open {
    transform: rotate(45deg);
  }
}

.answer {
  font-size: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  visibility: hidden;
  transition: visibility 0s linear 0.2s, opacity 0.2s linear, height 0.2s ease-out, padding 0.2s ease-out;
  height: 0;
  padding: 0 24px;
  overflow: hidden;

  @media (min-width: 992px) {
    font-size: 24px;
  }

  a {
    color: var(--color-light);
  }
  
  &.show {
    visibility: visible;
    opacity: 0.7;
    transition-delay: 0s;
    height: unset;
    padding: 16px 24px 32px;
  }
}
</style>