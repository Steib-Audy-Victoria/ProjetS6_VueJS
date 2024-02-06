<script>
import axios from 'axios'
export default {
  data() {
    return {
      voiture: {}
    }
  },
  created() {
    this.loadVoiture()
  },
  methods: {
    async loadVoiture() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://localhost:4000/voiture/${id}`)
        this.voiture = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des détails de la voiture:', error)
      }
    }
  }
}
</script>

<template>
  <div class="voiture">
    <h2>
      <span>{{ voiture.Marque }}</span> - <span>{{ voiture.Modele }}</span>
    </h2>
    <div class="voiture__middle">
      <img :src="voiture.imgVoiture" alt="Image de la voiture" />
      <p>{{ voiture.Info }}</p>
    </div>
    <p class="voiture__annee">
      <span>{{ voiture.AnneeDebutFabrication }}</span>
      -
      <span v-if="voiture.AnneeFinFabrication === 0">Existe toujours</span>
      <span v-else>{{ voiture.AnneeFinFabrication }}</span>
    </p>
  </div>
</template>

<style lang="scss">
.voiture {
  min-height: 80vh;
  margin-top: 5rem;

  h2 {
    margin-bottom: 1rem;
    font-size: $medium-font-size;
    font-weight: 600;
    text-align: center;
    span {
      color: $beigeFonce;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    width: 30rem;
    height: auto;
  }

  &__middle {
    display: grid;
    grid-template:
      'img'
      'text';
    justify-content: center;
    align-items: center;
    gap: 1rem;

    margin: 1rem;

    @include medium-up {
      grid-template: 'img text';
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
