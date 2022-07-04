<template>
    <div class="new-post">
        <form method="post" enctype="multipart/form-data">
            <div class="new-post__group">
                <input type="text" placeholder="What's up title ?" v-model="title">
            </div>
            <div class="new-post__group new-post__group--content">
                <input type="text" placeholder="What's up people ?" v-model="content">
            </div>
            <div class="new-post__group new-post__group--hide">
                <label for="image">Ajouter une image</label>
                <input type="file" @change="addMedia" ref="mediaInput">
            </div>
            <div class="new-post__group">
                <button @click.prevent="$refs.mediaInput.click()">Ajouter une image</button>
            </div>
            <div class="new-post__group">
                <button type="submit" @click.prevent="createPost">Créer un post</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.new-post {
    background: #292929;
    width: 18rem;
    border-radius: 0.4rem;
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
    padding: 1rem;

    &__group {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 0 1.2rem;
        &--hide {
            display: none;
        }
        & label {
            display: block;
            margin: 0 0 0.7rem;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.2em;
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
        &--content {
            height: 5rem;
        }
        & button {
            background: #FD2D01;
            width: 100%;
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
    }

    @media screen and (min-width: 500px) {
        width: 30rem;
    }
    @media screen and (min-width: 768px) {
        width: 40rem;
    }
    @media screen and (min-width: 1024px) {
        width: 60rem;
    }
}
</style>

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
            this.media = e.target.files[0];
        },
        createPost() {
            const postForm = new FormData()
            postForm.append("userId", this.userId)
            postForm.append("title", this.title)
            postForm.append("content", this.content)
            postForm.append("media", this.media)
            this.axios.post(`http://localhost:3000/api/post/`, postForm, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
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

