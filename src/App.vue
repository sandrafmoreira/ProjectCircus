<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1> Project Circus! :D</h1>
    <div class="wrapper">

      <nav>
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
        <RouterLink :to="{name: 'login'}">Iniciar Sessão</RouterLink>
        <RouterLink :to="{name: 'signup'}">Criar Conta</RouterLink>
        <RouterLink :to="{name: 'account'}">My Account</RouterLink>
        <RouterLink :to="{name: 'pricing'}">Planeia a tua visita</RouterLink>
        <RouterLink :to="{name: 'giftshop'}">Giftshop</RouterLink>
        <RouterLink :to="{name: 'activities'}">Espetáculos e Workshops</RouterLink>
        <RouterLink :to="{name: 'about'}">About</RouterLink> 
        <!-- <RouterLink :to="{name: 'gallery'}">Galeria</RouterLink> -->
        <!-- <RouterLink :to="{name: 'contacts'}">Contacte-nos</RouterLink> -->
        <!-- <RouterLink :to="{name: 'faq'}">FAQ</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
