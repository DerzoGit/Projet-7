<template>
    <div>
        <h1>Bienvenue sur {{ site }}. Inscrivez-vous !</h1>
        <div>
            <div>
                <router-link to="/signup">Inscription</router-link> |
                <router-link to="/login">Connexion</router-link>
            </div>
            <form>
                <label for="lastName">Nom :</label>
                <input type="text" placeholder="Nom" v-model="lastName">
                <label for="firstName">Prénom :</label>
                <input type="text" placeholder="Prénom" v-model="firstName">
                <label for="email">Mail :</label>
                <input type="email" placeholder="Mail" v-model="email">
                <label for="password">Mot de Passe :</label>
                <input type="password" placeholder="Mot de passe" v-model="password">
                <button type="submit" @click.prevent="signup()">Créer un compte</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUpUser",
        data() {
            return {
                site: "Groupomania",
                lastName: "",
                firstName: "",
                email: "",
                password: ""
            }
        },
        methods: {
            signup() {
                this.axios.post(`http://localhost:3000/api/auth/signup`, {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    console.log(response, "response")
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