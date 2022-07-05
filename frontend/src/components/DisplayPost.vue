<template>
    <div>
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
                    <button v-if="userId == post.userId" @click.prevent="displayUpdatePost(post.id)">Modifier</button>
                </div>
                <div class="post__group">
                    <button v-if="userId == post.userId || userRole == 'Admin'" @click.prevent="deletePost(post.id)">Supprimer</button>
                </div>
                
                <div v-if="displayUpdate == post.id">
                    <div class="post post__update">
                        <div class="post__group">
                            <p>Modification de post</p>
                        </div>
                        <form method="post" enctype="multipart/form-data">        
                            <div class="post__group">
                                <input type="text" v-model="title">
                            </div>    
                            <div class="post__group">
                                <input type="text" v-model="content">
                            </div>
                            <div class="post__group">
                                <label for="image">Ajouter une image</label>
                                <input type="file" @change="addMedia" ref="mediaInput">
                            </div>    
                            <div class="post__group">
                                <button @click.prevent="$refs.mediaInput.click()">Modifier l'image</button>
                            </div>
                            <div class="post__group">
                                <button type="submit" @click.prevent="updatePost(post.id), hideUpdatePost()">Modifier le post</button>
                            </div>
                        </form>
                        <div class="post__group">
                            <button @click="hideUpdatePost()">Annuler</button>
                        </div>
                        
                    </div>
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
            title: "",
            content: "",
            media: null,
            displayUpdate: "",
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId"),
            userRole: localStorage.getItem("userRole")
        }
    },
    methods: {
        displayPost() {
            if(!this.token) {
                this.$router.push({ name: "Login" })
            } else {
            this.axios.get(`http://localhost:3000/api/post/`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.posts = res.data
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })}
        },
        deletePost(id) {
            this.axios.delete(`http://localhost:3000/api/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                location.reload()
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        displayUpdatePost(id) {
            this.displayUpdate = id
            console.log(this.displayUpdate)
        },
        hideUpdatePost() {
            this.displayUpdate = null
            console.log(this.displayUpdate)
        },
        addMedia(e) {
            this.media = e.target.files[0];
        },
        updatePost(id) {
            const updateForm = new FormData()
            updateForm.append("title", this.title)
            console.log(this.title)
            updateForm.append("content", this.content)
            console.log(this.content)
            updateForm.append("media", this.media)
            console.log(this.media)
            console.log(updateForm)
            this.axios.put(`http://localhost:3000/api/post/${id}`, updateForm, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.$router.go()
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
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
        &__media {
            max-width: 100%;
        }
    }

    &__update {
        width: 16rem;
    }

    @media screen and (min-width: 500px) {
        width: 30rem;
        &__update {
            width: 28rem;
        }
    }
    @media screen and (min-width: 768px) {
        width: 40rem;
        &__update {
            width: 38rem;
        }
    }
    @media screen and (min-width: 1024px) {
        width: 60rem;
        &__update {
            width: 58rem;
        }
    }
}
</style>