<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <RouterLink :to="{name: 'home'}">
          <img src="../assets/nav_img/navbar_logo.svg" alt="Logo da Navbar">
      </RouterLink>
    </div>

    <div class="navbar-links">
      <RouterLink id="contacts-link" :to="{name: 'contacts'}">Contacte-nos</RouterLink>      
      <Cart></Cart>
      <Menu></Menu>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/stores/users';
import Cart from '@/components/cart.vue';
import Menu from '@/components/menu.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'Navbar',
  components:{
      Cart,
      RouterLink,
      Menu
  },

  data() {
      return {
      userStore: useUserStore(), //A store de authentication
      }
},

};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color:var(--color-body);
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra leve */
  position: fixed; /* Navbar fixa no topo */
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* .navbar-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
} */

.navbar-links{
display: flex;
flex-direction: row;
align-items: center;
gap: 50px;
}

#contacts-link{
  padding: 8px 15px;
  border-radius: 25px;
  border: 1px solid #E63946;
  background-color: #E63946;
  text-decoration: none; 
  color: white
}

#contacts-link:hover{
  border: 1px solid #E63946;
  background-color: #B72636;
}

</style>
