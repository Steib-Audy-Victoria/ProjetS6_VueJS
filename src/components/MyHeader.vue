<script setup>
import MyLogo from '@/components/elements/MyLogo.vue'
import MyLogoMenu from '@/components/elements/MyLogoMenu.vue'
</script>

<template>
  <header class="header">
    <MyLogo color="blanc" size="petit" />

    <router-link to="/" class="header__link">
      <h1 class="header__titre">Au Volant de la Diversité Mondiale</h1>
    </router-link>

    <MyLogoMenu color="blanc" size="petit" />
  </header>
</template>

<style lang="scss">
.header {
  background-color: $noir;
  color: $blanc;
  padding: 0.5rem 1rem;
  border-radius: 0 0 2rem 2rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  &__titre {
    font-size: $smallRegular-font-size;
    font-weight: 600;
    margin: 0;

    @include medium-up {
      font-size: $middleMedium-font-size;
    }
  }

  &__link {
    text-decoration: none;
    color: $blanc;
  }
}
</style>
