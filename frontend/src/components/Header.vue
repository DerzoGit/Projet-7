<template>
    <div id="nav">
        <router-link to="/">Feed</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signup" v-if="!token">Inscription</router-link> |
        <router-link to="/login" v-if="!token">Connexion</router-link>
        <button v-else @click="logOut()">Déconnexion</button> |
        <button v-if="token" @click.prevent="deleteAccount()">Supprimer le compte</button>
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

    &.router-link-exact-active {
        color: #42b983;
    }
    }
}
</style>