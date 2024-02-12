<template>
  <div class="ComparePays">
    <div class="ChoixPays">
      <h2 class="ChoixPays__titre">Comparer deux pays</h2>
      <form @submit.prevent="comparePays">
        <select v-model="selectedPaysA">
          <option disabled value="">Sélectionnez un pays A</option>
          <option v-for="pays in paysList" :key="pays.NomPays" :value="pays.NomPays">
            {{ pays.NomPays }}
          </option>
        </select>
        <select v-model="selectedPaysB">
          <option disabled value="">Sélectionnez un pays B</option>
          <option v-for="pays in paysList" :key="pays.NomPays" :value="pays.NomPays">
            {{ pays.NomPays }}
          </option>
        </select>
        <button type="submit">Comparer</button>
      </form>
    </div>

    <div v-if="compareResultat">
      <h3>Résultats de la comparaison</h3>
      <div class="CompareDetails" v-if="paysA && paysB">
        <div class="CompareDetails__left">
          <div class="CompareDetails__presentation">
            <h4>{{ paysA.NomPays }}</h4>
            <img :src="paysA.Drapeau" alt="Drapeau du pays" />
          </div>
          <ul class="CompareDetails__details">
            <h5>Détails du pays</h5>
            <li><strong>Capitale :</strong> {{ paysA.Capitale }}</li>
            <li><strong>Continent :</strong> {{ paysA.Continent }}</li>
            <li><strong>Superficie :</strong> {{ paysA.Superficie }} km²</li>
            <li><strong>Langue :</strong> {{ paysA.Langue }}</li>
            <li><strong>Devise :</strong> {{ paysA.Devise }}</li>
            <li><strong>Monnaie :</strong> {{ paysA.Monnaie }}</li>
            <li><strong>Fuseau Horaire :</strong> {{ paysA.FuseauHoraire }}</li>
          </ul>
          <div class="CompareDetails__marquesVoiture" v-if="paysA.marques && paysA.marques.length">
            <h5>Marques de voiture</h5>
            <div class="CompareDetails__marquesVoiture-liste">
              <ul v-for="marque in paysA.marques" :key="marque.MarqueID">
                <li>
                  <router-link
                    class="MarqueLink"
                    :to="{ name: 'Marque', params: { id: marque.MarqueID } }"
                  >
                    <img :src="marque.LogoMarque" alt="Logo du pays" />
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="CompareDetails__ChartJs">
            <VentesByMarques
              v-if="paysA && paysA.voitures && paysA.voitures.length"
              :NomPays="paysA.NomPays"
            />
          </div>
          <div class="CompareDetails__Voiture" v-if="paysA.voitures && paysA.voitures.length">
            <h5>Voitures :</h5>
            <div class="CompareDetails__Voiture-liste">
              <ul
                class="CompareDetails__Voiture-liste-card"
                v-for="voiture in paysA.voitures"
                :key="voiture.VoitureID"
              >
                <router-link
                  class="VoitureLink"
                  :to="{ name: 'Voiture', params: { id: voiture.VoitureID } }"
                >
                  <div>
                    <img :src="voiture.imgVoiture" alt="Image de la voiture" />
                  </div>
                  <div class="CompareDetails__Voiture-liste-card-infos">
                    <li class="CompareDetails__Voiture-liste-card-infos-NomMarque">
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
        <div class="CompareDetails__right">
          <div class="CompareDetails__presentation">
            <h4>{{ paysB.NomPays }}</h4>
            <img :src="paysB.Drapeau" alt="Drapeau du pays" />
          </div>
          <ul class="CompareDetails__details">
            <h5>Détails du pays</h5>
            <li><strong>Capitale :</strong> {{ paysB.Capitale }}</li>
            <li><strong>Continent :</strong> {{ paysB.Continent }}</li>
            <li><strong>Superficie :</strong> {{ paysB.Superficie }} km²</li>
            <li><strong>Langue :</strong> {{ paysB.Langue }}</li>
            <li><strong>Devise :</strong> {{ paysB.Devise }}</li>
            <li><strong>Monnaie :</strong> {{ paysB.Monnaie }}</li>
            <li><strong>Fuseau Horaire :</strong> {{ paysB.FuseauHoraire }}</li>
          </ul>
          <div class="CompareDetails__marquesVoiture" v-if="paysB.marques && paysB.marques.length">
            <h5>Marques de voiture</h5>
            <div class="CompareDetails__marquesVoiture-liste">
              <ul v-for="marque in paysB.marques" :key="marque.MarqueID">
                <li>
                  <router-link
                    class="MarqueLink"
                    :to="{ name: 'Marque', params: { id: marque.MarqueID } }"
                  >
                    <img :src="marque.LogoMarque" alt="Logo du pays" />
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="CompareDetails__ChartJs">
            <VentesByMarques
              v-if="paysB && paysB.voitures && paysB.voitures.length"
              :NomPays="paysB.NomPays"
            />
          </div>
          <div class="CompareDetails__Voiture" v-if="paysB.voitures && paysB.voitures.length">
            <h5>Voitures :</h5>
            <div class="CompareDetails__Voiture-liste">
              <ul
                class="CompareDetails__Voiture-liste-card"
                v-for="voiture in paysB.voitures"
                :key="voiture.VoitureID"
              >
                <router-link
                  class="VoitureLink"
                  :to="{ name: 'Voiture', params: { id: voiture.VoitureID } }"
                >
                  <div>
                    <img :src="voiture.imgVoiture" alt="Image de la voiture" />
                  </div>
                  <div class="CompareDetails__Voiture-liste-card-infos">
                    <li class="CompareDetails__Voiture-liste-card-infos-NomMarque">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VentesByMarques from '@/components/VentesByMarques.vue'

export default {
  components: {
    VentesByMarques
  },
  data() {
    return {
      selectedPaysA: '',
      selectedPaysB: '',
      paysList: [],
      compareResultat: null,
      paysA: null,
      paysB: null
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:4000/pays')
      this.paysList = response.data.pays
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des pays', error)
    }
  },
  methods: {
    async comparePays() {
      try {
        const responsePaysA = await axios.get(
          `http://localhost:4000/pays/nom/${this.selectedPaysA}`
        )
        const responsePaysB = await axios.get(
          `http://localhost:4000/pays/nom/${this.selectedPaysB}`
        )
        this.paysA = responsePaysA.data
        this.paysB = responsePaysB.data
        this.compareResultat = true
      } catch (error) {
        console.error('Erreur lors de la comparaison des pays', error)
      }
    }
  }
}
</script>

<style lang="scss">
.ComparePays {
  min-height: 80vh;

  h3 {
    text-align: center;
  }
}

.ChoixPays {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  &__titre {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  form {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    select {
      background: $beigeClair;
      border: 1px solid $beigeFonce;
      border-radius: 0.25rem;
    }
    button {
      padding: 0.5rem;
      border: 1px solid $beigeFonce;
      border-radius: 0.25rem;
      background-color: $beigeFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
    }
  }
}

.CompareDetails {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  &__left,
  &__right {
    width: 45%;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  &__presentation {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    h4 {
      text-align: center;
      font-size: $medium-font-size;
      font-weight: 700;

      @include medium-up {
        font-size: $big-font-size;
      }
    }
    img {
      width: 2rem;
      height: auto;
      object-fit: cover;

      @include medium-up {
        width: 3rem;
      }
      @include large-up {
        width: 5rem;
      }
    }
  }

  &__details {
    margin: 1rem 0;
    h5 {
      text-align: center;
      font-weight: 500;
      font-size: $middleMedium-font-size;
      color: $beigeFonce;
    }

    strong {
      color: $beigeFonce;
      font-weight: 500;
    }
  }

  &__marquesVoiture {
    margin: 1rem 0;
    h5 {
      text-align: center;
      font-weight: 500;
      font-size: $middleMedium-font-size;
      color: $beigeFonce;
      margin-bottom: 1rem;
    }

    &-liste {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 0.5rem;

      @include large-up {
        grid-template-columns: repeat(3, minmax(0, 1fr));
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
        box-shadow: 0 0 6px $grisFonce;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 5rem;
          height: 5rem;
        }

        img {
          width: 4rem;
          height: auto;
          object-fit: cover;
        }
      }
    }
  }

  &__Voiture {
    padding-top: 1rem;
    h5 {
      font-size: $regular-font-size;
      font-weight: 600;
      text-align: center;
      color: $beigeFonce;
      margin-bottom: 1rem;

      @include medium-up {
        font-size: $middleMedium-font-size;
      }
    }

    &-liste {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 1rem;

      @include medium-up {
        grid-template-columns: repeat(2, minmax(0, 1fr));
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
          width: 40rem;
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
