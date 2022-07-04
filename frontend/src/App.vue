<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "app",
  components: { 
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  width: 100%;
  min-height: 100vh;
  background-color: #121212;
  color: white;
  text-align: center;
}
</style>