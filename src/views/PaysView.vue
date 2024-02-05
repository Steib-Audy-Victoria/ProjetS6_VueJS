<template>
  <div class="pays">
    <div class="pays__details">
      <h2>Détails du pays</h2>
      <p>Nom du pays : {{ Pays.NomPays }}</p>
      <p>Capitale : {{ Pays.Capitale }}</p>
      <p>Continent : {{ Pays.Continent }}</p>
      <p>Superficie : {{ Pays.Superficie }} km²</p>
      <p>Drapeau :</p>
      <img :src="Pays.Drapeau" alt="Drapeau du pays" />
      <p>Langue : {{ Pays.Langue }}</p>
      <p>Devise : {{ Pays.Devise }}</p>
      <p>Monnaie : {{ Pays.Monnaie }}</p>
      <p>Fuseau Horaire : {{ Pays.FuseauHoraire }}</p>
    </div>
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
