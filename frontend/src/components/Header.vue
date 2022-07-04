<template>
    <div class="nav">
        <router-link to="/" class="nav__element">Feed</router-link>
        <!-- <router-link to="/about" class="nav-element">About</router-link> -->
        <router-link to="/signup" v-if="!token" class="nav__element">Inscription</router-link>
        <router-link to="/login" v-if="!token" class="nav__element">Connexion</router-link>
        <button v-else @click="logOut()" class="nav__element">Déconnexion</button>
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
        logOut() {
            localStorage.removeItem("userToken")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRole")
            this.$router.go()
        },
        deleteAccount() {
            this.axios.delete(`http://localhost:3000/api/user/${this.userId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.logOut()
                this.$router.push({ name: "SignUp" })
                this.$router.go()
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss">
.nav {
    padding: 1.8rem;
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
}
</style>