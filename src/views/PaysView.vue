<template>
  <div>
    <h1>Détails du pays</h1>
    <p>Nom du pays : {{ Pays.NomPays }}</p>
    {{ Pays }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      Pays: {}
    }
  },
  methods: {
    async fetchPaysDetails() {
      try {
        const NomPays = this.$route.params.NomPays
        const response = await axios.get(
          `http://localhost:4000/pays/nom/${this.$route.params.NomPays}`
        )
        this.Pays = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du pays', error)
      }
    }
  },
  mounted() {
    this.fetchPaysDetails()
  }
}
</script>

<style lang="scss"></style>
