<template>
    <div>
        <div v-for="post in posts" :key="post.postId">
            <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
            <p>{{ post.userId }}</p>
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
            <img :src="post.media">
            
            
        </div>
    </div>
</template>

<script>
export default {
    name: "Feed",
    data() {
        return {
            posts: {
                postId: "",
                userId: "",
                firstName: "",
                lastName: "",
                title: "",
                content: "",
                media: "",
                createdAt: ""
            },
            token: localStorage.getItem("userToken")
        }
    },
    mounted() {
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
            })
    }
}
</script>

<style>

</style>