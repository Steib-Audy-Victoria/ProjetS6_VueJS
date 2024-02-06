<script>
import axios from 'axios'
export default {
  data() {
    return {
      marque: {}
    }
  },
  created() {
    this.loadMarque()
  },
  methods: {
    async loadMarque() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://localhost:4000/marque/${id}`)
        this.marque = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la marque:', error)
      }
    }
  }
}
</script>

<template>
  <div class="marque">
    <div class="marque__Gauche">
      <h2>{{ marque.NomMarque }}</h2>
      <p>{{ marque.InfosMarque }}</p>
      <p class="marque__annee">
        <span>{{ marque.AnneeCreation }}</span>
        -
        <span v-if="marque.AnneeDisparition === 0">Existe toujours</span>
        <span v-else>{{ marque.AnneeDisparition }}</span>
      </p>
    </div>
    <div class="marque__Droite">
      <img :src="marque.LogoMarque" alt="Logo du pays" />
    </div>
  </div>
</template>

<style lang="scss">
.marque {
  display: grid;
  grid-template:
    'Droite'
    'Gauche';

  @include medium-up {
    grid-template: 'Gauche Gauche Droite';
  }

  min-height: 80vh;

  &__Gauche {
    grid-area: Gauche;
    padding: 1rem;

    h2 {
      margin-bottom: 1rem;
      font-size: $medium-font-size;
      font-weight: 600;
      text-align: center;
    }

    p {
      margin-bottom: 1rem;
    }
  }

  &__Droite {
    grid-area: Droite;
    padding: 1rem;

    img {
      width: 30rem;
      height: auto;
    }
  }

  &__annee {
    text-align: center;

    span {
      font-weight: 600;
      color: $beigeFonce;
    }
  }
}
</style>
