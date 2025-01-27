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
};
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
</style>
