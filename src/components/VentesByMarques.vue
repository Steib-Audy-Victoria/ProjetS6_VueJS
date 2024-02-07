<template>
  <div class="VentesByMarques">
    <canvas id="camembertChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import axios from 'axios'

export default {
  methods: {
    async fetchVentesVoituresByMarques() {
      try {
        const response = await axios.get(
          `http://localhost:4000/ventes-voitures-marques/${this.$route.params.NomPays}`
        )
        const data = response.data

        // Extrayez les noms de marques et les ventes correspondantes
        const labels = data.map((entry) => entry.NomMarque)
        const ventes = data.map((entry) => entry.NbVentes)

        // Générer des couleurs aléatoires
        const backgroundColor = []
        for (let i = 0; i < labels.length; i++) {
          const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.7)`
          backgroundColor.push(randomColor)
        }

        // Créez un camembert
        const ctx = document.getElementById('camembertChart')
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Nombre de ventes',
                data: ventes,
                backgroundColor: backgroundColor,
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Répartition des ventes par marque'
              }
            }
          }
        })
      } catch (error) {
        console.error('Erreur lors de la récupération des données de ventes par marque', error)
      }
    }
  },

  mounted() {
    this.fetchVentesVoituresByMarques()
  }
}
</script>

<style lang="scss"></style>
