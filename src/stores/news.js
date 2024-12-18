import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore("news", {
  state: () => {
    return{ 
      articles: [
        {id: 1, title: 'Article 1', text: 'Albino'},
        {id: 2, title: 'Article 2', text: 'Constantina'},
        {id: 3, title: 'Article 3', text: 'Penélope'},
      ]
    }
  },

})
