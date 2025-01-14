<script>
import { RouterLink, RouterView } from 'vue-router'
// import { useUserStore } from '@/stores/users';
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';

//vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue';

const vuetify = createVuetify({
  components,
  directives,
})
  //--------------
// createApp(App).use(vuetify).mount('#app')

export default {
  components: {
    Footer,
    Navbar,
  },

  // data() {
  //   return {
  //     userStore: useUserStore(), //A store de authentication
  //   }
  // },

  // methods: {
  //   logout() {
  //     this.userStore.logout() //Chamar a função logout na store da authentication

  //     this.$router.push({ name: "home" }); //Voltar para a homepage
  //   }
  // },
};
</script>

<template>

  <!-- <nav>
    <RouterLink :to="{name: 'home'}">Home</RouterLink>
    <RouterLink :to="{name: 'pricing'}">Planeia a tua visita</RouterLink>
    <RouterLink :to="{name: 'giftshop'}">Giftshop</RouterLink>
    <RouterLink :to="{name: 'activities'}">Espetáculos e Workshops</RouterLink>
    <RouterLink :to="{name: 'about'}">About</RouterLink> 
    <RouterLink :to="{name: 'gallery'}">Galeria</RouterLink>
    <RouterLink :to="{name: 'news'}">Destaques</RouterLink>
    <RouterLink :to="{name: 'contacts'}">Contacte-nos</RouterLink>
    Links que aparecem apenas se o utilziador NAO estiver autenticado
    <RouterLink v-if="!userStore.isAuthenticated" :to="{name: 'login'}">Iniciar Sessão</RouterLink>
    <RouterLink v-if="!userStore.isAuthenticated" :to="{name: 'signup'}">Criar Conta</RouterLink>
    Links que apenas aparecem se o utilizador estiver autenticado
    <RouterLink v-if="userStore.isAuthenticated" :to="{name: 'account', params: {id: userStore.userInfo.id}}">My Account</RouterLink>
    <button v-if="userStore.isAuthenticated" @click="logout">Logout</button>
    <Cart></Cart>
  </nav> -->

  <div class="main-layout">
    <!-- <Header /> -->
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <RouterView />
    </main>
    
     <Footer></Footer>
  </div>

 
</template>

<style scoped>

.main-layout {
    padding: 0;
    margin: 0;
  }
  
  main {
    padding: 3rem 0rem;  /* Espaçamento em volta do conteúdo principal */
    display: flex;
    flex-direction: column;
    gap: 4rem; /* Espaçamento entre as seções */
  }
</style>
