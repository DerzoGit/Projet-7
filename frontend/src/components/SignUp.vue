<template>
    <div>
        <h1>Bienvenue sur Groupomania.</h1>
        <div class="signup-form">
            <h2>Inscrivez-vous !</h2>
            <form>
                <div class="signup-form__group">
                    <label for="lastName">Nom :</label>
                    <input type="text" placeholder="Nom" v-model="lastName">
                </div>
                <div class="signup-form__group">
                    <label for="firstName">Prénom :</label>
                    <input type="text" placeholder="Prénom" v-model="firstName">
                </div>
                <div class="signup-form__group">
                    <label for="email">Mail :</label>
                    <input type="email" placeholder="Mail" v-model="email">
                </div>
                <div class="signup-form__group">
                    <label for="password">Mot de Passe :</label>
                    <input type="password" placeholder="Mot de passe" v-model="password">
                </div>
                <p v-if="errorMessage">{{ errorMessage }}</p>
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
            signup() {
                this.axios.post(`http://localhost:3000/api/auth/signup`, {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    alert("Votre compte a bien été créé")
                    this.$router.push({ name: "Login" })
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
            color: #FFFFFF;
            font-family: inherit;
            font-size: inherit;
            font-weight: 500;
            text-transform: uppercase;
            cursor: pointer;

            transition: 0.3s ease;

            &:hover {
            background: #FFD7D7;
            color: black;
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