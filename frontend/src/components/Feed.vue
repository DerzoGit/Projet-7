<template>
    <div>
        <NewPost/>
        <DisplayPost/>
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
            token: localStorage.getItem("userToken"),
            userId: localStorage.getItem("userId")
        }
    }
}
</script>

<style>

</style>