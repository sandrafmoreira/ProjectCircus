
import { defineStore } from "pinia";
import * as api from "../api/photosApi";

// const UNSPLASH_API_BASE_URL= 'https://api.unsplash.com'
const PEXELS_API_BASE_URL= 'https://api.pexels.com/v1'


export const usePhotoStore = defineStore("photoStore", {
  state: () => {
    return{ 
      Photos: [],
      per_page:9, 
      maxPhotos:60
    }
  },
  getters:{
        getPhoto:(state)=>state.Photos,
        
      },
  actions: {

    async pexelsFetchCircusPhotos() {

      try {

        console.log("Fetching circus photos...");
     
        const pexelsData  = await api.get(PEXELS_API_BASE_URL, `search?query=circus&page=1&per_page=${this.per_page}`);
        this.Photos= pexelsData.photos;
        
        console.log( this.Photos);
      } catch (error) {
        throw new Error(`Error fetching  'search?query=nature&per_page=1': ${error}`);
      }
    },

    async fetchPhotos() {      
      try {
        console.log('fff');
        
          await this.photosStore.pexelsFetchCircusPhotos();
          this.photos = this.photosStore.Photos; // Atualiza o estado local
           console.log("Fetched photos:", this.photos);
      } catch (error) {
          console.error('Erro ao buscar os todos:', error);
      }
      },
}});

