<template>

    <section class="main-section">
        <div class="main-section-text" >
            <h1 class="main-section-title">Momentos Inesquecíveis <br> do Nosso Circo</h1>
            <p class="main-section-desc">Um espetáculo em imagens onde cada foto é uma acrobacia, <br>e cada momento, único.</p>
        </div>
        
        <div class="main-section-img">
            
        </div>
    </section>

    <section class="section">

        <div class="grafic-el-gallery">
            <svg width="630" height="608" viewBox="0 0 730 808" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.4946 46.3968C300.743 -69.6917 560.133 56.0629 661.899 184.718C661.899 184.718 867.158 447.831 562.711 681.194C258.264 914.556 -12.3731 796.479 -108.744 547.048C-183.682 353.088 -155.754 162.485 72.4946 46.3968Z" fill="#E4CB66"/>
            </svg>
        </div>
        <customBtn  @click="verifyAutentication">
            Partilhar
        </customBtn>
  
        <div class="section-content gallery-img-container"> 
            <div class="">
                <v-row dense >
                <!-- Renderiza cada imagem ocupando 2 colunas -->
                <v-col
                    v-for="photo in photos" :key="photo.id"
                    cols="4">
                
                    <v-img
                    :src="photo.src || photo.urls.full" alt="Imagem"
                    class="align-end gallery-img-card ma-2" 
                    ></v-img>
                    
                </v-col>
                </v-row>
            </div>
            
        </div>
        <template>
            <v-icon icon="mdi-home" />
        </template>
        <customBtn>
            +
        </customBtn>
        
     

    </section>
</template>
  
<script>
        
        import customBtn from '@/components/customBtn.vue';
        import { useUserStore } from '@/stores/users' 
        import { usePhotoStore } from '@/stores/photo'
    
    
        export default {
            components:{
            customBtn
           },

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


           methods:{
                // async fetchPhotos() {      
                //     try {
                //         console.log("Fetching circus photos...")
                //         await this.photosStore.fetchCircusPhotos('circus');
                //         this.photos = this.photosStore.circusPhotos; // Atualiza o estado local
                //     } catch (error) {
                //         console.error('Erro ao buscar os photos:', error);
                //         alert('Erro ao buscar imagens.');
                //     }
                // },

                async fetchPhotos() {      
                try {
                    await this.photosStore.fetchTodos();
                    this.photos = this.photosStore.circusPhotos; // Atualiza o estado local
                } catch (error) {
                    console.error('Erro ao buscar os todos:', error);
                }
                },

                verifyAutentication(event){
                    if(this.userStore.isAuthenticated){
                        this.$router.push(`/account/${this.userStore.userInfo.email}`)
                        
                    }else{
                        alert('login')// usar o component alert
                    }
                },
            }

        };
            

  </script>
  
  <style lang="scss" scoped>

  .main-section-img{
    background-image: url('/src/assets/img/gallery_clowns.svg');
    background-size:unset;
    background-position:center bottom;
  }

  .grafic-el-gallery{
    position: absolute; /* ou absolute, dependendo do layout */
    z-index: -1;
    left: 0;
    transform: translateY(-12%);

  }
  /* .gallery-img-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.gallery-img-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.gallery-img-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
} */
  
  .gallery-img-card{
    border-radius: 2%;
  }

  .gallery-img-container{
    padding: 0;
    margin: 0;

  }
  </style>