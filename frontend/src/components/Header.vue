<template>
    <div class="nav">
        <router-link to="/" class="nav__element">Feed</router-link>
        <!-- Affichage de l'inscription/connexion si l'utilisateur n'est pas connecté, sinon affichage déconnexion/suppression compte -->
        <router-link to="/signup" v-if="!token" class="nav__element">Inscription</router-link>
        <router-link to="/login" v-if="!token" class="nav__element">Connexion</router-link>
        <button v-else @click="logOut()" class="nav__element"><span class="nav__desktop">Déconnexion</span><i class="fa-solid fa-power-off nav__mobile"></i></button>
        <button v-if="token" @click.prevent="deleteAccount()" class="nav__element">Supprimer le compte</button>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
        // Clear du localStorage à la déconnexion
        logOut() {
            localStorage.removeItem("userToken")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRole")
            this.$router.go()
        },

        // Requête delete du compte de l'utilisateur, comprenant ses posts et autres
        deleteAccount() {
            this.axios.delete(`http://localhost:3000/api/user/${this.userId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(() => {
                // Après suppression, déconnexion et renvoi vers la page d'inscription avec actualisation pour le header
                this.logOut()
                this.$router.push({ name: "SignUp" })
                this.$router.go()
            })
            .catch(() => {
            })
        }
    }
}
</script>

<style lang="scss">
.nav {
    padding: 1.6rem;
    font-size: 1.2rem;

    a {
        font-weight: 400;
        color: white;
        text-decoration: none;

        &.router-link-exact-active {
            color: #fd2b01;
        }
    }

    &__element {
        margin: 0.4rem;
    }

    & button {
        background: #FD2D01;
        border: none;
        border-radius: 0.4rem;
        padding: 0.4rem;
        color: #FFFFFF;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        cursor: pointer;
        transition: 0.3s ease;
        
        &:hover {
            background: #FFD7D7;
            color: black;
        }
    }
    &__mobile {
        @media screen and (min-width: 768px) {
            display: none;
        }
    }
    &__desktop {
        display: none;
        @media screen and (min-width: 768px) {
            display: inline;
        }
    }
}
</style>