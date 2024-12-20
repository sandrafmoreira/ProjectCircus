import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore("product", {
  state: () => {
    return{ 
      products: [ {
        name: "",
        description: '',
        price: 0,
        image: '',
        exclusive: false, //despunivel apenas para utilizadores
    }]
    }
  },

  getters:{},

  actions: {
    addProduct(product) {
      this.products.push(product)
    }
  }


})