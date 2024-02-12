<template>
  <div class="profil">
    <div v-if="utilisateur">
      <h1 class="profil__titre">Profil Utilisateur</h1>
      <div class="profil__info">
        <p><strong>Nom d'utilisateur:</strong> {{ utilisateur.NomUser }}</p>
        <p><strong>Email:</strong> {{ utilisateur.Email }}</p>
        <p v-if="paysList.length > 0">
          <strong>Pays:</strong>
          {{ paysList.find((pays) => pays.PaysID === utilisateur.PaysID).NomPays }}
        </p>
        <p v-else>Aucun pays disponible</p>
      </div>
      <div class="profil__edit-form" v-if="!isEditing">
        <button @click="isEditing = true">Modifier le Profil</button>
      </div>
      <div class="profil__edit-form" v-else>
        <input type="text" v-model="nouveauNomUser" placeholder="Nouveau nom d'utilisateur" />
        <input type="email" v-model="nouvelEmail" placeholder="Nouvel email" />
        <select v-model="nouveauPays">
          <option v-for="pays in paysList" :key="pays.PaysID" :value="pays.PaysID">
            {{ pays.NomPays }}
          </option>
        </select>
        <button @click="sauvegarderModifications">Sauvegarder</button>
        <button @click="annulerModifications">Annuler</button>
      </div>
      <div class="profil__btn">
        <button class="profil__btn-deco">
          <router-link class="profil__btn-deco-link" to="/deconnexion">Deconnexion</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      utilisateur: null,
      paysList: [],
      isEditing: false,
      nouveauNomUser: '',
      nouvelEmail: '',
      nouveauPays: null
    }
  },
  mounted() {
    this.fetchUserProfile()
    this.fetchCountries()
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('Vous devez être connecté pour afficher le profil.')
          this.$router.push('/connexion')
          return
        }
        const headers = { Authorization: token }

        const response = await axios.get('http://localhost:4000/profil', { headers })
        this.utilisateur = response.data
        this.nouveauNomUser = response.data.NomUser
        this.nouvelEmail = response.data.Email
        this.nouveauPays = response.data.PaysID
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error)
      }
    },
    async fetchCountries() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('Vous devez être connecté pour afficher le profil.')
          this.$router.push('/connexion')
          return
        }
        const headers = { Authorization: token }
        const response = await axios.get('http://localhost:4000/pays', { headers })
        this.paysList = response.data.pays
      } catch (error) {
        console.error('Erreur lors de la récupération des pays:', error)
      }
    },
    async sauvegarderModifications() {
      const data = {
        NomUser: this.nouveauNomUser,
        Email: this.nouvelEmail,
        PaysID: this.nouveauPays
      }

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          alert('Vous devez être connecté pour modifier le profil.')
          this.$router.push('/connexion')
          return
        }
        const headers = { Authorization: token }
        const response = await axios.put('http://localhost:4000/profil-modifier', data, { headers })
        if (response.status === 200) {
          this.isEditing = false
          this.fetchUserProfile() // Actualiser les informations du profil après modification
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error)
      }
    },
    annulerModifications() {
      this.isEditing = false
      // Réinitialiser les champs de formulaire avec les informations actuelles du profil
      this.nouveauNomUser = this.utilisateur.NomUser
      this.nouvelEmail = this.utilisateur.Email
      this.nouveauPays = this.utilisateur.PaysID
    }
  }
}
</script>

<style lang="scss">
.profil {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &__titre {
    font-weight: 500;
    margin: 1rem 0;
  }

  &__info {
    margin: 2rem 0;

    p {
      margin: 5px 0;
    }
  }

  &__edit-form {
    margin-top: 20px;

    input,
    select {
      display: block;
      margin-bottom: 10px;
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button {
      margin: 1rem 0;
      margin-right: 1rem;
      padding: 0.5rem;
      border: 1px solid $beigeFonce;
      border-radius: 0.25rem;
      background-color: $beigeFonce;
      color: $blanc;
      font-weight: 500;
      cursor: pointer;
    }
  }

  &__btn {
    &-deco {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid $beigeFonce;
      border-radius: 0.25rem;
      background-color: $beigeFonce;
      font-weight: 500;
      cursor: pointer;

      &-link {
        text-decoration: none;
        color: $blanc;
      }
    }
  }
}
</style>
