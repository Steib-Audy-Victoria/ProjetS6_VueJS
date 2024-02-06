<template>
  <div class="Pays">
    <div class="Presentation">
      <h2>{{ Pays.NomPays }}</h2>
      <img :src="Pays.Drapeau" alt="Drapeau du pays" />
    </div>
    <hr class="Pays__ligne" />
    <div class="Infos">
      <div class="Infos__Gauche"></div>
      <div class="Infos__Droite">
        <ul class="Infos__Droite-detailsPays">
          <li><strong>Capitale :</strong> {{ Pays.Capitale }}</li>
          <li><strong>Continent :</strong> {{ Pays.Continent }}</li>
          <li><strong>Superficie :</strong> {{ Pays.Superficie }} km²</li>
          <li><strong>Langue :</strong> {{ Pays.Langue }}</li>
          <li><strong>Devise :</strong> {{ Pays.Devise }}</li>
          <li><strong>Monnaie :</strong> {{ Pays.Monnaie }}</li>
          <li><strong>Fuseau Horaire :</strong> {{ Pays.FuseauHoraire }}</li>
        </ul>
      </div>
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

<style lang="scss">
.Pays {
  &__ligne {
    border: 1px solid $noir;
    border-radius: 5rem;
    width: 90%;
  }
}

.Presentation {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 0;
  h2 {
    font-size: $bigger-font-size;
    font-weight: 700;
  }
  img {
    width: 5rem;
    height: auto;
    object-fit: cover;
  }
}
.Infos {
  display: grid;
  grid-template:
    'Gauche'
    'Droite';

  @include medium-up {
    grid-template: 'Gauche Gauche Gauche Gauche Droite';
  }

  &__Gauche {
    grid-area: Gauche;
    padding: 0.5rem;
  }

  &__Droite {
    grid-area: Droite;
    padding: 0.5rem;

    &-detailsPays {
      list-style: none;
      border: 2px solid $beigeFonce;
      background-color: $beigeClair;
      border-radius: 2rem;
      box-shadow: 0 0 10px $beigeFonce;
      padding: 0.5rem;
      li {
        margin: 0.5rem 0;
        strong {
          font-weight: 700;
          color: $beigeFonce;
        }
      }
    }
  }
}
</style>
