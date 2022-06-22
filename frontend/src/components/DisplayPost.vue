<template>
    <div>
        <div v-for="post in posts" :key="post.postId">
            <div>
                <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
                <p>{{ post.userId }}</p>
                <p>{{ post.title }}</p>
                <p>{{ post.content }}</p>
                <img :src="post.media">
                <button v-if="userId == post.userId || userRole == 'Admin'" @click.prevent="deletePost(post.id)">Supprimer</button>
                <button v-if="userId == post.userId" @click="displayUpdatePost(post.id)">Modifier</button>
                <div v-if="displayUpdate">
                    <div>
                        <form method="post" enctype="multipart/form-data">                
                            <input type="text" v-model="title">
                            <input type="text" v-model="content">
                            <label for="image">Ajouter une image</label>
                            <input type="file" @change="addMedia" ref="mediaInput">
                            <button @click.prevent="$refs.mediaInput.click()">Modifier l'image</button>
                            <button type="submit" @click.prevent="updatePost(post.id), hideUpdatePost()">Modifier</button>
                        </form>
                        <button @click="hideUpdatePost()">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import UpdatePost from "@/components/UpdatePost.vue"

export default {
    name: "DisplayPost",
    components:  {
        // UpdatePost
    },
    data() {
        return {
            posts: [],
            title:"",
            content:"",
            media:null,
            displayUpdate: false,
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
        displayUpdatePost() {
            this.displayUpdate = true
            console.log(this.displayUpdate)
        },
        hideUpdatePost() {
            this.displayUpdate = false
            console.log(this.displayUpdate)
        },
        addMedia(e) {
            this.media = e.target.files[0];
        },
        updatePost(id) {
            const updateForm = new FormData()
            updateForm.append("userId", this.userId)
            console.log(this.userId)
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
                // this.$router.go()
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

<style>

</style>