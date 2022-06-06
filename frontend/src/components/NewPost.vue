<template>
    <div>
        <form method="post" enctype="multipart/form-data">
            <input type="text" placeholder="What's up title ?" v-model="title">
            <input type="text" placeholder="What's up people ?" v-model="content">
            <label for="image">Ajouter une image</label>
            <input type="file" @change="addMedia" ref="mediaInput">
            <button @click.prevent="$refs.mediaInput.click()">Ajouter une image</button>
            <button type="submit" @click.prevent="createPost">Créer un post</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "NewPost",
    data() {
        return{
            title: "",
            content: "",
            media: null,
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
        }
    }
}
</script>

<style>

</style>