// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import * as pexelsApi from "../api/pexelsApi";
import * as unsplashApi from "../api/unsplashApi";

const UNSPLASH_API_BASE_URL= 'https://api.unsplash.com'

export const usePhotoStore = defineStore("photoStore", {
  state: () => {
    return{ 
      circusPhotos: [], // circus publications are different from users pub
    }
  },

  getters:{
    getPhoto:(state)=>state.circusPhotos,
    
  },

  actions: {

    async fetchCircusPhotos() {
      try {
        this.circusPhotos = await unsplashApi.get(UNSPLASH_API_BASE_URL, 'search/photos?page=1&query=office');
      } catch (error) {
        throw new Error(`Erro ao obter os todos: ${error}`);
      }
    },

    // async fetchCircusPhotos(query) {
    //   try {
    //     console.log("Fetching circus photos...");

    //     const pexelsData = await pexelsApi.get(query);
    //     console.log('Pexels Data:', pexelsData); 
    //     const pexelsCircusPhotos = pexelsData.photos;
        

    //     const unsplashData = await unsplashApi.get(query)
    //     const insplashCircusPhotos = unsplashData.results;
    //     console.log('Unsplash Data:', unsplashData);

    //     this.circusPhotos = [...pexelsCircusPhotos, ...insplashCircusPhotos];
    //     console.log("Combined Circus Photos:", this.circusPhotos);
    //   } catch (error) {
    //     console.error("Error in store fetching circus photos:", error);
    //     throw error;
    //   }
    // },
    // addPhoto(photo) {
    //   this.photos.push(photo)
    // }
  }
})
