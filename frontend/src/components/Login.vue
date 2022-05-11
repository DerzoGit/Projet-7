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
                password: ""
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
                })
                .catch((error) => {
                    console.log(error, "error")
                })
            }
        }
    }
</script>

<style>

</style>