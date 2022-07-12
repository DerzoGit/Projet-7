// Import de Vue pour utiliser une application Vue
import Vue from 'vue'
// Import de l'App Vue
import App from './App.vue'
// Import du routeur pour les pages
import router from './router'
// Import d'axios pour réaliser les requêtes backend
import axios from 'axios'
import VueAxios from 'vue-axios'
// Import du css pour reset
import '@/assets/style.css'

// Appel d'axios
Vue.use(VueAxios, axios)

// Désactive tips dans la console
Vue.config.productionTip = false

// Création d'une application vue avec utilisation de router
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
