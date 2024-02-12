<script setup>
import VentesByMarques from '@/components/VentesByMarques.vue'
</script>

<template>
  <div class="Pays">
    <div class="Presentation">
      <h2>{{ Pays.NomPays }}</h2>
      <img :src="Pays.Drapeau" alt="Drapeau du pays" />
    </div>
    <hr class="Pays__ligne" />
    <div class="Infos">
      <div class="Infos__Gauche">
        <div class="marquesVoiture" v-if="Pays.marques && Pays.marques.length">
          <h3>Marques de voiture</h3>
          <div class="marquesVoiture__liste">
            <ul v-for="marque in Pays.marques" :key="marque.MarqueID">
              <router-link
                class="MarqueLink"
                :to="{ name: 'Marque', params: { id: marque.MarqueID } }"
              >
                <img :src="marque.LogoMarque" alt="Logo du pays" />
                <!-- <li>
                  <p>{{ marque.NomMarque }}</p>
                </li> -->
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="Infos__Droite">
        <ul class="Infos__Droite-detailsPays">
          <h3>Détails du pays</h3>
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
    <div class="GridChartJs">
      <div v-if="Pays && Pays.voitures && Pays.voitures.length">
        <VentesByMarques :NomPays="Pays.NomPays" />
      </div>
    </div>

    <div class="Voiture" v-if="Pays.voitures && Pays.voitures.length">
      <h3>Voitures :</h3>
      <div class="Voiture__liste">
        <ul class="Voiture__liste-card" v-for="voiture in Pays.voitures" :key="voiture.VoitureID">
          <router-link
            class="VoitureLink"
            :to="{ name: 'Voiture', params: { id: voiture.VoitureID } }"
          >
            <div>
              <img :src="voiture.imgVoiture" alt="Image de la voiture" />
            </div>
            <div class="Voiture__liste-card-infos">
              <li class="Voiture__liste-card-infos-NomMarque">
                <span>{{ voiture.Marque }}</span>
                -
                <span>{{ voiture.Modele }}</span>
              </li>
              <li>
                <span>{{ voiture.AnneeDebutFabrication }}</span>
                -
                <span v-if="voiture.AnneeFinFabrication === 0">Toujours fabriquer</span>
                <span v-else>{{ voiture.AnneeFinFabrication }}</span>
              </li>
            </div>
          </router-link>
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
        console.log(NomPays)
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
  margin: 1rem;
  @include medium-up {
    margin: 1rem 5rem;
  }
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
    font-size: $medium-font-size;
    font-weight: 700;

    @include medium-up {
      font-size: $bigger-font-size;
    }
  }
  img {
    width: 3rem;
    height: auto;
    object-fit: cover;

    @include medium-up {
      width: 5rem;
    }
    @include large-up {
      width: 8rem;
    }
  }
}
.Infos {
  display: grid;
  grid-template:
    'Droite'
    'Gauche';

  @include large-up {
    grid-template: 'Gauche Gauche Droite';
  }

  &__Gauche {
    grid-area: Gauche;
    padding: 1rem;
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

      h3 {
        font-size: $regular-font-size;
        font-weight: 600;
        text-align: center;
        color: $beigeFonce;

        @include medium-up {
          font-size: $medium-font-size;
        }
      }

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

.Voiture {
  padding-top: 1rem;
  h3 {
    font-size: $regular-font-size;
    font-weight: 600;
    text-align: center;
    color: $beigeFonce;
    margin-bottom: 1rem;

    @include medium-up {
      font-size: $medium-font-size;
    }
  }

  &__liste {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;

    @include medium-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include large-up {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem;

      list-style: none;

      border: 2px solid $beigeFonce;
      background-color: $beigeClair;
      border-radius: 2rem;
      box-shadow: 0 0 10px $beigeFonce;

      img {
        width: 50rem;
        height: auto;
        object-fit: cover;
        border-radius: 2rem;
      }

      &-infos {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &-NomMarque {
          color: $beigeFonce;
          span {
            font-weight: 600;
            text-align: center;
            color: $beigeFonce;
          }
        }
      }
    }
  }
}

.marquesVoiture {
  h3 {
    font-size: $regular-font-size;
    font-weight: 600;
    text-align: center;
    color: $grisFonce;
    margin-bottom: 1rem;

    @include medium-up {
      font-size: $medium-font-size;
    }
  }

  &__liste {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;

    @include large-up {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      padding: 0.1rem;

      @include medium-up {
        padding: 0.3rem;
      }
      @include large-up {
        padding: 0.5rem;
      }

      list-style: none;

      border: 2px solid $grisFonce;
      background-color: $grisClair;
      border-radius: 2rem;
      box-shadow: 0 0 10px $grisFonce;

      img {
        width: 5rem;
        height: auto;
        object-fit: cover;
      }
    }
  }
}

.GridChartJs {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include large-up {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.MarqueLink {
  text-decoration: none;
  color: $noir;
}
.VoitureLink {
  text-decoration: none;
  color: $noir;
}
</style>
