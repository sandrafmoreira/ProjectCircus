<template>
    <button @click="verifyAutentication">Partilhar</button>
    <!-- grid vuetify -->
   <div class="card" v-for="photo in photos" :key="photo.id">
    {{ photo.img }}</div>
  </template>
  
  <script>
        import { useUserStore } from '@/stores/users' 
      import { usePhotoStore } from '@/stores/photo'
    
    
        export default {
           data() {
            return {
                photosStore: usePhotoStore(),
                userStore:useUserStore(),
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