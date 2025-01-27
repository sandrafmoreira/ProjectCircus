<script>
import { RouterLink, RouterView } from 'vue-router'
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

export default {
  components: {
    
    Navbar,
  },

  data() {
    return {
      isVisible: false
    }
  },

  methods: {
    handleScrollButton() {
      if (window.pageYOffset > 500) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScrollButton);
  },

};

onUnmounted(() => {
    window.removeEventListener("scroll", this.handleScrollButton)
  })
</script>

<template>
  <div class="main-layout">
    <!-- <Header /> -->
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <RouterView />
    </main>
    
     <a v-if="isVisible" href="#" class=" scrollButton fixed bottom-4 right-4 bg-">
      <img src="/src/assets/home_assets/scrollUp.svg" alt="Botao para fazer scroll">
     </a>
  </div>

 
</template>

<style scoped>

.main-layout {
    padding: 0;
    margin: 0;
  }
  
  main {
    padding: 0rem 0rem 0rem;  /* Espaçamento em volta do conteúdo principal */
    display: flex;
    flex-direction: column;
    gap: 4rem; /* Espaçamento entre as seções */
  }

.scrollButton{
  position: fixed;
  top: 80%;
  right: 5%;
}
</style>
