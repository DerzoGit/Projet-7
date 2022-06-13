<template>
    <div>
        <NewPost/>
        <DisplayPost/>

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
import NewPost from '@/components/NewPost.vue'
import DisplayPost from '@/components/DisplayPost.vue'

export default {
    name: "Feed",
    components: {
        NewPost,
        DisplayPost
    },
    data() {
        return {
            comments: [],
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
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
            this.displayComment();
    }
}
</script>

<style>

</style>