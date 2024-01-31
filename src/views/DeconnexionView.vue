<template>
  <div class="deco">
    <h3 class="deco__titre">Déconnections</h3>
    <button class="deco__button" @click="deconnecter">Se déconnecter</button>
    <p class="deco__message">{{ deconnexionMessage }}</p>
    <!-- Reste du contenu de la page -->
  </div>
</template>

<script>
import { deconnecter } from '../utils/connexion.js'

export default {
  data() {
    return {
      deconnexionMessage: ''
    }
  },
  methods: {
    deconnecter() {
      // Appel de la fonction deconnexion
      deconnecter()

      // Mise à jour de la propriété deconnexionMessage
      this.deconnexionMessage = 'Vous vous êtes déconnecté avec succès.'

      // Redirige l'utilisateur vers la page d'accueil
      this.$router.push('/')
    }
    // Reste des méthodes du composant
  }
}
</script>

<style lang="scss">
.deco {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;

  &__titre {
    color: $noir;
    font-weight: 500;
    text-align: center;
    margin: 2rem;
  }

  &__button {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid $grisFonce;
    border-radius: 0.25rem;
    background-color: $grisFonce;
    color: $blanc;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
