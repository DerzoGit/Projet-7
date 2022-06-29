<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: "app",
  components: { 
    Header 
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