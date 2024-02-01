<script setup>
import MyLogo from '@/components/elements/MyLogo.vue'
import MyLogoMenu from '@/components/elements/MyLogoMenu.vue'
</script>

<template>
  <header class="header">
    <MyLogo color="blanc" size="moyen" />

    <h1 class="header__titre">Au Volant de la Diversité Mondiale</h1>

    <MyLogoMenu color="blanc" size="moyen" />
  </header>
</template>

<style lang="scss">
.header {
  background-color: $noir;
  color: $blanc;
  padding: 1rem 2rem;
  border-radius: 0 0 2rem 2rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  &__titre {
    font-size: $big-font-size;
    font-weight: 600;
    margin: 0;
  }
}
</style>
