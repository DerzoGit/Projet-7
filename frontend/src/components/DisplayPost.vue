<template>
    <div>
        <div v-for="post in posts" :key="post.postId">
            <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
            <p>{{ post.userId }}</p>
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
            <img :src="post.media">
            <button v-if="userId == post.userId" @click.prevent="deletePost(post.id)">Supprimer</button>
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
            userId: localStorage.getItem("userId")
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
        }
    },
    mounted() {
        this.displayPost()
    }
}
</script>

<style>

</style>