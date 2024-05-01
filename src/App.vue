<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue';

const route = useRoute()
const currentRouteName = computed(() => route.name)

</script>
<template>
  <Header v-if="currentRouteName != 'hekaton'"></Header>
  <RouterView />
</template>

<style scoped>
</style>
