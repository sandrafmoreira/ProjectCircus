import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePhotoStore = defineStore("photo", {
  state: () => {
    return{ 
      photos: []
    }
  },

  actions: {
    addPhoto(photo) {
      this.photos.push(photo)
    }
  }
})
