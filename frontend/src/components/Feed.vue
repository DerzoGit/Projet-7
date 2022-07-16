<template>
    <div>
        <!-- Récupération et affichage de la création d'un post et des différents posts -->
        <NewPost/>
        <DisplayPost/>
    </div>
</template>

<script>
// Importation de la création d'un post et de l'affichage des posts
import NewPost from '@/components/NewPost.vue'
import DisplayPost from '@/components/DisplayPost.vue'

export default {
    name: "Feed",
    components: {
        NewPost,
        DisplayPost
    }
}
</script>