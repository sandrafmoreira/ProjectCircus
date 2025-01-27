<template>

  <section class="main-section-gallery"  style="margin-left: 60px;">
      <div class="section-texts" >
          <h1 class="section-title">Momentos Inesquecíveis <br> do Nosso Circo</h1>
          <p class="section-desc">Um espetáculo em imagens onde cada foto é uma acrobacia, <br>e cada momento, único.</p>
      </div>
      
      <div class="main-section-img">
          
      </div>
  </section>

  <section class="section"  style="margin-left: 60px; margin-right: 60px;">

      <div class="graphic-el-gallery">
          <svg width="630" height="608" viewBox="0 0 730 808" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M72.4946 46.3968C300.743 -69.6917 560.133 56.0629 661.899 184.718C661.899 184.718 867.158 447.831 562.711 681.194C258.264 914.556 -12.3731 796.479 -108.744 547.048C-183.682 353.088 -155.754 162.485 72.4946 46.3968Z" fill="#E4CB66"/>
          </svg>
      </div>
      <button class="btn-red" @click="verifyAutentication">
        Partilhar
      </button>

      <div class="gallery-section-container "> 
          <div class="gallery-img-container">
              <v-row dense >
              <!-- imagens publicadas pelo utilizador -->
                <v-col v-for="post in userStore.userPosts" :key="post.id" cols="4">
                  <div class="post-container">
                    <v-img :src="post.image" alt="Imagem"
                      class="align-end gallery-img-card ma-2" 
                      id="post-img"
                      :aspectRatio="1.5"
                      cover>
                      <div class="post-details">
                        <p><b>{{ post.author }}</b></p>
                        <p><b>{{ post.caption }}</b></p>
                      </div>
                    </v-img>
                     
                  </div>
                </v-col>
                <!-- imagens da API do pexel -->
                <v-col
                    v-for="photo in photos" :key="photo.id"
                    cols="4">
                  <div class="post-container">
                    <v-img
                        :src="photo.src.original || photo.urls.full" alt="Imagem"
                        class="align-end gallery-img-card ma-2" 
                        :aspectRatio="1.5"
                        cover
                        >
                      <div class="post-details">
                        <p><b>Circo Illusioni</b></p>
                        <p><b>O nosso circo!</b></p>
                      </div>
                      
                    </v-img>
                     
                  </div>
              </v-col>
              </v-row>
          </div>
          <button class="btn-red" @click="loadPhotos">
            +
          </button>
          
      </div>
   
      
   

  </section>

  <Footer></Footer>
</template>

<script>
      

      import { useUserStore } from '@/stores/users' 
      import { usePhotoStore } from '@/stores/photo'
      import Footer from '@/components/Footer.vue';
 
  
      export default {
          components:{
     
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
              verifyAutentication(event){
                  if(this.userStore.isAuthenticated){
                      this.$router.push(`/account/${this.userStore.userInfo.email}`)
                      
                  }else{
                      alert('Precisa de se autenticar para aceder a esta funcionalidade!')// usar o component alert
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
padding-bottom:4rem;
padding-top: 20rem;
height: 100%;
}

.main-section-img{
  background-image: url('/src/assets/img/gallery_clowns.svg');
  background-size:contain;
  background-position:center bottom;
}

.graphic-el-gallery{
  position: absolute; /* ou absolute, dependendo do layout */
  z-index: -1;
  left: 0;
  transform: translateY(-12%);

}

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

.post-details{
display: flex;
justify-content: space-between;
position: absolute;
background-image: url('@/assets/gallery_assets/post-background.svg');
width: 100%;
height: 60px;
bottom: 0;
opacity: 0;
visibility: hidden;
transition: opacity 0.3s ease-in-out;
}

.post-container:hover .post-details{
  opacity: 1;
  visibility: visible;
 
}

.post-details p{
margin-top: 22px;
padding: 0 10px;
}

.post-details p:nth-of-type(2) {
  margin-right: 60px;
}

</style>