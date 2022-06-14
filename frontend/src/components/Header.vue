<template>
    <div id="nav">
        <router-link to="/">Feed</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/signup" v-if="!userToken">Inscription</router-link> |
        <router-link to="/login" v-if="!userToken">Connexion</router-link>
        <a href="" v-else @click="logOut()">Déconnexion</a>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            userToken: localStorage.getItem("userToken")
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem("userToken")
            localStorage.removeItem("userId")
            localStorage.removeItem("userRole")
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