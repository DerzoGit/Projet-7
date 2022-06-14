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
            </div>
            <div v-if="displayUpdate">
                <form method="post" enctype="multipart/form-data">
                    <input type="text" v-model="post.title">
                    <input type="text" v-model="post.content">
                    <label for="image">Ajouter une image</label>
                    <!-- <input type="file" @change="addMedia" ref="mediaInput"> -->
                    <!-- <button @click.prevent="$refs.mediaInput.click()">Ajouter une image</button> -->
                    <button type="submit" @click.prevent="updatePost(post.id)">Modifier</button>
                </form>
                <!-- <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
                <p>{{ post.userId }}</p>
                <p>{{ post.title }}</p>
                <p>{{ post.content }}</p>
                <img :src="post.media">
                <button v-if="userId == post.userId" @click.prevent="deletePost(post.id)">Supprimer</button> -->
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
        updatePost(id) {
            const updateForm = new FormData()
            updateForm.append("title", this.post.title)
            updateForm.append("content", this.post.content)
            updateForm.append("media", this.post.media)
            this.axios.put(`http://localhost:3000/api/post/${id}`, updateForm, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.displayPost = false
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

<style>

</style>