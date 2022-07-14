<template>
    <div>
        <!-- Affichage pour chaque post identité utilisateur, titre, contenu et image si présente-->
        <div v-for="post in posts" :key="post.postId">
            <div class="post">
                <div class="post__group">
                    <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
                </div>
                <div class="post__group">
                    <p>{{ post.title }}</p>
                </div>
                    <div class="post__group">
                        <p>{{ post.content }}</p>
                    </div>
                    <div class="post__group">
                        <img :src="post.media" class="post__group__media">
                    </div>
                <div class="post__group">
                    <!-- Affichage button de suppression si auteur du post ou admin -->
                    <button v-if="userId == post.userId || userRole == 'Admin'" @click.prevent="deletePost(post.id)"><span class="post__group__desktop">Supprimer</span><i class="fa-solid fa-trash-can post__group__mobile"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DisplayPost",
    data() {
        return {
            posts: [],
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId"),
            userRole: localStorage.getItem("userRole")
        }
    },
    methods: {
        // Renvoi vers la connexion si pas connecté
        displayPost() {
            if(!this.token) {
                this.$router.push({ name: "Login" })
            } else {
            // Méthode get pour affichage de tous les posts
            this.axios.get(`http://localhost:3000/api/post/`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.posts = res.data
            })
            .catch(() => {
            })}
        },
        // Méthode delete d'un post
        deletePost(id) {
            this.axios.delete(`http://localhost:3000/api/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(() => {
                // Actualise la page pour ne plus voir le post supprimé
                location.reload()
            })
            .catch(() => {
            })
        }
    },
    mounted() {
        // Affichage des posts après requête
        this.displayPost()
    }
}
</script>

<style lang="scss" scoped>
.post {
    background: #292929;
    width: 18rem;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
    padding: 0.5rem;

    &__group {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 0 1.2rem 0;
        & p {
            display: block;
            margin: 0 0 0.7rem;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.2em;
        }
        & button {
            background: #FD2D01;
            width: 50%;
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
        &__media {
            max-width: 100%;
        }
        &__mobile {
            @media screen and (min-width: 500px) {
                display: none;
            }
        }
        &__desktop {
            display: none;
            @media screen and (min-width: 501px) {
                display: inline;
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