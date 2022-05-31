<template>
    <div>
        <div>
            <form method="post" enctype="multipart/form-data">
                <input type="text" placeholder="What's up title ?" v-model="newPost.title">
                <input type="text" placeholder="What's up people ?" v-model="newPost.content">
                <label for="image">Ajouter une image</label>
                <input type="file" @change="addMedia" ref="mediaInput">
                <button @click.prevent="$refs.mediaInput.click()">Ajouter une image</button>
                <button type="submit" @click.prevent="createPost">Créer un post</button>
            </form>
        </div>

        <div v-for="post in posts" :key="post.postId">
            <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
            <p>{{ post.userId }}</p>
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
            <img :src="post.media">
        </div>

        <!-- <div v-for="comment in comments" :key="comment.commentid">
            <p>{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
            <p>{{ comment.id }}</p>
            <p>{{ comment.userId }}</p>
            <p>{{ comment.postId }}</p>
            <p>{{ comment.content }}</p>
            <img :src="comment.media">
        </div> -->

    </div>
</template>

<script>
export default {
    name: "Feed",
    data() {
        return {
            posts: [],
            comments: [],
            newPost: {
                title: "",
                content: "",
                media: null
            },
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
        addMedia(e) {
            this.newPost.media = e.target.files[0];
        },
        createPost() {
            const postForm = new FormData()
            postForm.append("userId", this.userId)
            postForm.append("title", this.newPost.title)
            postForm.append("content", this.newPost.content)
            postForm.append("media", this.newPost.media)
            this.axios.post(`http://localhost:3000/api/post/`, postForm, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
                    }
                })
                .then((res) => {
                    location.reload()
                    console.log(res, "blbl")
                })
                .catch((error) => {
                    console.log(error, "errorblb")
                })
        },
        displayPost() {
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
        },
        displayComment() {
            this.axios.get(`http://localhost:3000/api/comment`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then((res) => {
                this.comments = res.data
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
            this.displayPost();
            this.displayComment();
    }
}
</script>

<style>

</style>