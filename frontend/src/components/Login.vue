<template>
    <div>
        <h1>Bienvenue sur Groupomania. Connectez-vous !</h1>
        <div>
            <div>
                <router-link to="/signup">Inscription</router-link> |
                <router-link to="/login">Connexion</router-link>
            </div>
            <form>
                <label for="email">Mail :</label>
                <input type="email" placeholder="Mail" v-model="email">
                <label for="password">Mot de Passe :</label>
                <input type="password" placeholder="Mot de passe" v-model="password">
                <button type="submit" @click.prevent="login()">Se connecter</button>
                <p v-if="errorMessage">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginUser",
        data() {
            return {
                email: "",
                password: "",
                errorMessage: ""
            }
        },
        methods: {
            login() {
                this.axios.post(`http://localhost:3000/api/auth/login`, {
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    alert("Vous êtes connecté")
                    console.log(res, res.data.token, "Utilisateur bien connecté")
                    localStorage.setItem("userToken", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    this.$router.push("/feed")
                })
                .catch((error) => {
                    this.errorMessage = error.response.data.error
                    console.log(error)
                })
            }
        }
    }
</script>

<style>

</style>