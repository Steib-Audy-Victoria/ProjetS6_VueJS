<template>
  <div class="listeMarques">
    <h2>Liste des marques de voitures</h2>
    <ul>
      <li v-for="(marque, index) in listeMarquesTriees" :key="index">
        <router-link
          class="listeMarques-link"
          :to="{ name: 'Marque', params: { id: marque.MarqueID } }"
        >
          {{ marque.NomMarque }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listeMarques: []
    }
  },
  computed: {
    // Tri des marques par ordre alphabétique
    listeMarquesTriees() {
      return this.listeMarques.slice().sort((a, b) => a.NomMarque.localeCompare(b.NomMarque))
    }
  },
  mounted() {
    this.fetchMarques()
  },
  methods: {
    fetchMarques() {
      fetch('http://localhost:4000/marques')
        .then((response) => response.json())
        .then((data) => {
          this.listeMarques = data.marques
        })
        .catch((error) => {
          console.error('Une erreur est survenue :', error)
        })
    }
  }
}
</script>

<style lang="scss">
.listeMarques {
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
