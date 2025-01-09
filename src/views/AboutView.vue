<template>

  <section>
    <div class="about">
    <h1>This is an about page 😵‍💫</h1>
  </div>
  </section>
 

  <Footer></Footer>
</template>



  <script >
    import Footer from '@/components/Footer.vue';
    
    export default {
      components: {
        Footer
      },
    };
  </script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
