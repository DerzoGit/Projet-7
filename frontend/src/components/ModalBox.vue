<template>
    <div class="modal" v-if="showModal">
        <div class="overlay" @click="toggleModal">
            <div class="modal__body">
                <button class="modal__btn"><div>x</div></button>
                <p><slot></slot></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: ["showModal", "toggleModal"]
}
</script>

<style lang="scss" scoped>
// .overlay {
//     background: rgba(0, 0, 0, 0.1);
//     position: fixed;
//     top:0;
//     bottom: 0;
//     left: 0;
//     right: 0;
// }

.modal {
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    &__body {
        background: #FFD7D7;
        color: black;
        padding: 2rem;
        position: fixed;
        top: 35vh;
        left: 45vw;
        font-size: 1.2rem;
        font-weight: 400;
    }
    &__btn {
        position: absolute;
        top: 0.5rem;
        right: 0.8rem;
        font-size: inherit;
        cursor: pointer;
        background: inherit;
        border: none;
        color: #FD2D01;
    }
}


</style>