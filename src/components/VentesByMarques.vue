<template>
  <div class="VentesByMarques">
    <canvas id="lineChart" width="800" height="800"></canvas>
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

        // Extraction des années uniques
        const years = [...new Set(data.map((entry) => entry.AnneeVentes))]
        const labels = years.map((year) => String(year))

        // Extraction des noms de marques
        const labelsMarques = [...new Set(data.map((entry) => entry.NomMarque))]

        // Création d'un objet pour stocker les ventes par marque pour chaque année
        const ventesParAnneeParMarque = {}
        labelsMarques.forEach((marque) => {
          ventesParAnneeParMarque[marque] = new Array(labels.length).fill(0)
        })

        // Remplissage des données de ventes par marque pour chaque année
        data.forEach((entry) => {
          const marqueIndex = labelsMarques.indexOf(entry.NomMarque)
          const yearIndex = years.indexOf(entry.AnneeVentes)
          ventesParAnneeParMarque[entry.NomMarque][yearIndex] = entry.NbVentes
        })

        // Création des datasets pour chaque marque
        const datasets = labelsMarques.map((marque, index) => {
          return {
            label: marque,
            data: ventesParAnneeParMarque[marque],
            borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 1)`,
            borderWidth: 1,
            fill: false
          }
        })

        // Création d'un graphique linéaire
        const ctx = document.getElementById('lineChart')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Nombre de ventes par marque et par année'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Année'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre de ventes'
                }
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

<style lang="scss">
/* Vos styles ici */
</style>
