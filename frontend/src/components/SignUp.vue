<template>
    <div>
        <h1>Bienvenue sur {{ site }}. Inscrivez-vous !</h1>
        <form>
            <label for="lastName">Nom :</label>
            <input type="text" placeholder="Nom">
            <label for="firstName">Prénom :</label>
            <input type="text" placeholder="Prénom">
            <label for="email">Mail :</label>
            <input type="email" placeholder="Mail">
            <label for="password">Mot de Passe :</label>
            <input type="password" placeholder="Mot de passe">
        </form>
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
    }
}
</script>

<style>

</style>