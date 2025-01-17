<template>

    <section class="main-section-gallery">
        <div class="section-texts" >
            <h1 class="section-title">Momentos Inesquecíveis <br> do Nosso Circo</h1>
            <p class="section-desc">Um espetáculo em imagens onde cada foto é uma acrobacia, <br>e cada momento, único.</p>
        </div>
        
        <div class="main-section-img">
            
        </div>
    </section>

    <section class="section">

        <div class="graphic-el-gallery">
            <svg width="630" height="608" viewBox="0 0 730 808" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.4946 46.3968C300.743 -69.6917 560.133 56.0629 661.899 184.718C661.899 184.718 867.158 447.831 562.711 681.194C258.264 914.556 -12.3731 796.479 -108.744 547.048C-183.682 353.088 -155.754 162.485 72.4946 46.3968Z" fill="#E4CB66"/>
            </svg>
        </div>
        <customBtn  @click="verifyAutentication">
            Partilhar
        </customBtn>
  
        <div class="gallery-section-container "> 
            <div class="gallery-img-container">
                <v-row dense >
                <!-- Renderiza cada imagem ocupando 2 colunas -->
                <v-col
                    v-for="photo in photos" :key="photo.id"
                    cols="4">
                
                    <v-img
                    :src="photo.src.original || photo.urls.full" alt="Imagem"
                    class="align-end gallery-img-card ma-2" 
                    :aspectRatio="1.5"
                    cover
                    ></v-img>
                    
                </v-col>
                </v-row>
            </div>

            <!-- <template>
            <v-icon icon="mdi-home" />
            </template> -->
            <customBtn class="view_more " @click="loadPhotos">
                +
            </customBtn>
            
        </div>
     
        
     

    </section>

    <Footer></Footer>
</template>
  
<script>
        
        import customBtn from '@/components/customBtn.vue';
        import { useUserStore } from '@/stores/users' 
        import { usePhotoStore } from '@/stores/photo'
        import Footer from '@/components/Footer.vue';
   
    
        export default {
            components:{
            customBtn,
            Footer
           },


           data() {
            return {
                
                photosStore: usePhotoStore(),
                userStore:useUserStore(),
                photos:[],
                maxPhotos:60,
            }
           },

           async created() {
            try {

             await this.photosStore.pexelsFetchCircusPhotos()
             this.photos=this.photosStore.Photos
             console.log("ok")
            } catch (error) {
              alert(error.message);
            }
          },


           methods:{
               

                // async loadPhotos() {   
                // // if (this.photosStore.Photos.length>=this.photosStore.maxPhotos) {
                // //   return
                  
                // // }   
                // try {
                //   console.log('lll');
                  
                //     await this.photosStore.pexelsFetchCircusPhotos();
                //     this.photos = this.photosStore.Photos; // Atualiza o estado local
                //      console.log("Fetched photos:", this.photos);
                //      if (this.photosStore.Photos.length<this.photosStore.maxPhotos) {
                //     this.photosStore.per_page +=10 
                //   }
                // } catch (error) {
                //     console.error('Erro ao buscar os todos:', error);
                // }
                // },

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

.main-section-gallery{
    display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 8rem;
}

  .main-section-img,.main-section-text {
  padding-bottom:8rem;
  padding-top: 20rem;
  height: 100%;
}

  .main-section-img{
    background-image: url('/src/assets/img/gallery_clowns.svg');
    background-size:unset;
    background-position:center bottom;
  }

  .graphic-el-gallery{
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

  .gallery-img-container .view_more {
    align-self: center;
  }
  </style>