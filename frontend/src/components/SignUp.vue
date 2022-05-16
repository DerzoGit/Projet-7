<template>
    <div>
        <h1>Bienvenue sur Groupomania. Inscrivez-vous !</h1>
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
                <p v-if="errorMessage">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUpUser",
        data() {
            return {
                lastName: "",
                firstName: "",
                email: "",
                password: "",
                errorMessage: ""
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
                .then((res) => {
                    alert("Votre compte a bien été créé")
                    this.$router.push("/login")
                    console.log(res, "Utilisateur bien créé")
                })
                .catch((error) => {
                    this.errorMessage = error.response.data.error
                    console.log(this.errorMessage)
                })
            }
        }
    }
</script>

<style>

</style>