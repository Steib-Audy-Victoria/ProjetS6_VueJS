<template>
  <div class="listeVoitures">
    <h2>Liste des voitures</h2>
    <ul>
      <li v-for="(voiture, index) in listeVoituresTriees" :key="index">
        <router-link
          class="listeVoitures-link"
          :to="{ name: 'Voiture', params: { id: voiture.VoitureID } }"
        >
          {{ voiture.Marque }} - {{ voiture.Modele }} - {{ voiture.NomPays }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listeVoitures: []
    }
  },
  computed: {
    // Tri des voitures par ordre alphabétique du modèle
    listeVoituresTriees() {
      return this.listeVoitures.slice().sort((a, b) => a.Marque.localeCompare(b.Marque))
    }
  },
  mounted() {
    this.fetchVoitures()
  },
  methods: {
    fetchVoitures() {
      fetch('http://localhost:4000/voitures')
        .then((response) => response.json())
        .then((data) => {
          this.listeVoitures = data.voitures
        })
        .catch((error) => {
          console.error('Une erreur est survenue :', error)
        })
    }
  }
}
</script>

<style lang="scss">
.listeVoitures {
  margin: 0.5rem;
  min-height: 80vh;
  h2 {
    font-size: $medium-font-size;
    font-weight: 600;
    text-align: center;
    margin: 1rem 0;

    @include medium-up {
      font-size: $big-font-size;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    place-items: center;
    gap: 1rem;

    @include medium-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include large-up {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &-link {
    text-decoration: none;
    font-size: $regular-font-size;
    color: $noir;
    cursor: pointer;
  }
  &-link:hover {
    text-decoration: underline;
    color: $beigeFonce;
  }
}
</style>
