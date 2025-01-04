<template>
    <h1>Momentos Inesquecíveis do Nosso Circo</h1>
    <p>Um espetáculo em imagens onde cada foto é uma acrobacia, e cada momento, único.</p>
    <button @click="verifyAutentication">Partilhar</button>
    <customBtn>
        Partilhar
    </customBtn>
    <!-- grid vuetify -->

    
    <div class="gallery-img-container">
        <v-row dense >
        <!-- Renderiza cada imagem ocupando 2 colunas -->
        <v-col
            v-for="photo in photos" :key="photo.id"
            cols="4">
        
            <v-img
            :src="photo.src"
            class="align-end gallery-img-card ma-2" 
            ></v-img>
            
        </v-col>
        </v-row>
    </div>


  </template>
  
  <script>
        import customBtn from '@/components/customBtn.vue';
        import { useUserStore } from '@/stores/users' 
      import { usePhotoStore } from '@/stores/photo'
    
    
        export default {
           data() {
            return {
                photosStore: usePhotoStore(),
                userStore:useUserStore(),
                photos:[
              {
                  id: 0,
                  src: '/src/assets/img/pexels-gesel-792764.jpg',
                 
              },
               {
                  id: 1,
                  src: '/src/assets/img/pexels-gesel-792764.jpg',
                  
                  
              },
              {
                  id: 2,
                  src: '/src/assets/img/pexels-gesel-792764.jpg',
                 
              },
              {
                  id: 3,
                  src: '/src/assets/img/pexels-gesel-792764.jpg',
                  
              },
              {
                  id: 4,
                  src: '/src/assets/img/pexels-gesel-792764.jpg',
                  
              }
          ]
            }
           },
           components:{
            customBtn
           },

           methods:{
                verifyAutentication(){
                    if(this.userStore.isAuthenticated){
                        this.$router.push(`/account/${this.userStore.userInfo.email}`)
                        
                    }else{
                        alert('login')// usar o component alert
                    }
                }

           }
        };
            

  </script>
  
  <style lang="scss" scoped>
  
  .gallery-img-card{
    border-radius: 2%;
  }

  .gallery-img-container{
    padding: 0;
    margin: 0;

  }
  </style>