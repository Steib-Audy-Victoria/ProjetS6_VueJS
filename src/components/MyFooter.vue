<script setup></script>

<template>
  <footer class="footer">
    <p class="footer__titre">Au Volant de la Diversité Mondiale</p>
    <hr class="footer__ligne" />
    <ul class="footer__lien">
      <li><router-link class="footer__lien-link" to="/">Plan du site</router-link></li>
      <li><router-link class="footer__lien-link" to="/">Mention légal</router-link></li>
      <li>
        <router-link class="footer__lien-link" to="/">Condition général d'utilisation</router-link>
      </li>
      <li><p>Tous Droits Réservés @2024</p></li>
    </ul>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: $noir;
  border-radius: 2rem 2rem 0 0;
  color: $blanc;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__titre {
    font-size: $regular-font-size;
    font-weight: 600;
    margin: 0;
    padding: 1rem 0;
    text-align: center;
  }

  &__ligne {
    border: 1px solid $blanc;
    width: 80%;
  }

  &__lien {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem 0;
    font-size: $small-font-size;
    font-variant: small-caps;

    &-link {
      color: $blanc;
      text-decoration: none;
    }

    &-link:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
