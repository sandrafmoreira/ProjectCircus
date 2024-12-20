<template>
    <button @click="verifyAutentication">Partilhar</button>
    <!-- grid vuetify -->
   <div class="card" v-for="photo in photos" :key="photo.id">
    {{ photo.img }}</div>
  </template>
  
  <script>
        import { useAuthenticationStore } from '@/stores/authentication' 
      import { usePhotoStore } from '@/stores/photo'
    
    
        export default {
           data() {
            return {
                photosStore: usePhotoStore(),
                userStore:useAuthenticationStore(),
            }
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
  
  </style>