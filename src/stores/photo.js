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
// sTvzXgLzKcATFWhYQb4IcaNm0hAgIp4WYAoEFBMwftIakPGCzcBkYKuu


// 693091
// y39lGmU1vRKl45G6rfmQ6daukd-AHulwbkLMBLUfNlE
// wQNcjZ_UZWqCvkVDz-f9fEuK4x_5H04tUzZrvU3w56Q