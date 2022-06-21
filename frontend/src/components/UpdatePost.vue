<template>
    <div>
        <form method="post" enctype="multipart/form-data">                
            <input type="text" v-model="post.title">
            <input type="text" v-model="post.content">
            <label for="image">Ajouter une image</label>
            <!-- <input type="file" @change="addMedia" ref="mediaInput"> -->
            <!-- <button @click.prevent="$refs.mediaInput.click()">Ajouter une image</button> -->
            <button type="submit" @click.prevent="updatePost(post.id)">Modifier</button>
        </form>
    </div>
</template>

<script>
import DisplayPost from "@/components/DisplayPost.vue"


export default {
    name: "UpdatePost",
    components: DisplayPost,
    data() {
        return {
            post: [],
            token: localStorage.getItem("userToken")
        }
    },
    methods: {
        updatePost(id) {
            const updateForm = new FormData()
            updateForm.append("title", this.title)
            updateForm.append("content", this.content)
            updateForm.append("media", this.media)
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
    }
}
</script>

<style>

</style>