<template>
    <div>
        <h1>Bienvenue sur Groupomania.</h1>
        <div class="signup-form">
            <h2>Inscrivez-vous !</h2>
            <!-- Formulaire d'inscription de l'utilisateur, Nom-Prénom-Mail-Pass -->
            <form>
                <div class="signup-form__group">
                    <label for="lastName">Nom :</label>
                    <input type="text" name="lastName" id="lastName" placeholder="Nom" v-model="lastName">
                </div>
                <div class="signup-form__group">
                    <label for="firstName">Prénom :</label>
                    <input type="text" name="firstName" id="firstName" placeholder="Prénom" v-model="firstName">
                </div>
                <div class="signup-form__group">
                    <label for="email">Mail :</label>
                    <input type="email" name="email" id="email" placeholder="Mail" v-model="email">
                </div>
                <div class="signup-form__group">
                    <label for="password">Mot de Passe :</label>
                    <input type="password" name="password" id="password" placeholder="Mot de passe" v-model="password">
                </div>
                <!-- Affichage si message d'erreur -->
                <p v-if="errorMessage">{{ errorMessage }}</p>
                <!-- Bouton d'envoi du formulaire, avec requête de signup -->
                <div class="signup-form__group">
                    <button type="submit" @click.prevent="signup()">Créer un compte</button>
                </div>
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
            // Requête post création d'un utilisateur
            signup() {
                this.axios.post(`http://localhost:3000/api/auth/signup`, {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password
                })
                .then(() => {
                    // Renvoi vers la page de connexion à la finalisation d'inscription
                    this.$router.push({ name: "Login" })
                })
                .catch((error) => {
                    this.errorMessage = error.response.data.error
                })
            }
        }
    }
</script>

<style lang="scss">
.signup-form {
    background: #292929;
    width: 18rem;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
    margin: 6rem auto;
    padding: 1rem;

    &__group {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 0 1.2rem;
        & label {
            display: block;
            margin: 0 0 0.7rem;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.2em;
        }
        & input {
            display: block;
            width: 100%;
            border: none;
            border-radius: 0.4rem;
            padding: 0.7rem 1.2rem;
            font-size: inherit;
            font-weight: 500;
            line-height: inherit;
            transition: 0.3s ease;
            &:focus {
                color: rgba(0, 0, 0, 0.8);
            }
        }
        & button {
            background: #FD2D01;
            width: 100%;
            border: none;
            border-radius: 0.4rem;
            padding: 0.7rem 1.2rem;
            color: #000;
            font-family: inherit;
            font-size: inherit;
            font-weight: 500;
            text-transform: uppercase;
            cursor: pointer;

            transition: 0.3s ease;

            &:hover {
            background: #FFD7D7;
            }
        }
    }

    @media screen and (min-width: 500px) {
        width: 30rem;
    }
    @media screen and (min-width: 768px) {
        width: 40rem;
    }
    @media screen and (min-width: 1024px) {
        width: 60rem;
    }
}
</style>