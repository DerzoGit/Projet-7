<template>
    <div class="footer">
        {{ copyright }}
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            
        }
    },
    computed: {
        // Création d'un copyright avec incrémentation de la date
        copyright: () => {
			const currentYear = new Date().getFullYear()

			return `Copyright Groupomania 2022-${currentYear}`
		}
    }
}
</script>

<style lang="scss">
.footer {
    padding: 1rem;
    font-size: 1rem;
}
</style>