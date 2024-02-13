<template>
  <div class="listePays">
    <h2>Liste des pays du monde</h2>
    <ul>
      <li v-for="(Pays, index) in listePays" :key="index">
        <router-link
          class="listePays-link"
          :to="{ name: 'pays', params: { NomPays: Pays.NomPays } }"
        >
          {{ Pays.NomPays }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listePays: []
    }
  },
  mounted() {
    this.fetchPays()
  },
  methods: {
    fetchPays() {
      fetch('http://localhost:4000/pays')
        .then((response) => response.json())
        .then((data) => {
          // Tri des pays par ordre alphabétique
          this.listePays = data.pays.sort((a, b) => a.NomPays.localeCompare(b.NomPays))
        })
        .catch((error) => {
          console.error('Une erreur est survenue :', error)
        })
    }
  }
}
</script>

<style lang="scss">
.listePays {
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
