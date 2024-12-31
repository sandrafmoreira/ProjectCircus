import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore("product", {
  state: () => {
    return{ 
      //Array default de produtos
      products: [{id: 1, name: "Caneca de Palhaço", description: "Uma divertida e charmosa caneca em forma de palhaço, perfeita para trazer um toque de alegria ao seu dia. Com detalhes coloridos e uma expressão amigável, é ideal para os amantes do circo e do design único!", price: 18, image: "../assets/caneca-palhaço.png", discount: 0, exclusive: true},
        {id: 2, name: "Pins", description: "um grande produto!", price: 7, image: "../assets/pins.png", discount: 0, exclusive: false},
        {id: 3, name: "Chapéu", description: "um produto mais ou menos!", price: 10, image: "../assets/chapeu.png", discount: 0, exclusive: false},
        {id: 4, name: "Pulseiras", description: "um produto mais ou menos!", price: 5, image: "../assets/pulseiras.png", discount: 0, exclusive: false}
      ]
    }
  },
  persist: {
    storage: localStorage,
    pick: ['products'],
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify
    }
  },

  getters:{
    exclusiveProducts: (state) => state.products.filter(product => product.exclusive).length, //Nº de produtos exclusivos
    discountedProducts: (state) => state.products.filter(product => product.discount > 0).length, //Nº de produtos com desconto
    findLastProduct: (state) => state.products[state.products.length - 1].id,
  },

  actions: {
    addProduct(name, description, price, image) {
      //Verificar se ja existe um produto com o mesmo nome
      if (this.products.some((product) => product.name == name)) {
        throw new Error
      }

      let newProduct = {
        id: this.findLastProduct + 1,
        name,
        description,
        price,
        image,
        discount: 0,
        exclusive: false //disponivel apenas para utilizadores autenticados
      }

      this.products.push(newProduct)
    },

    addDiscount(id, discount) {
      let productFound = false //Para detetar se um produto com o mesmo id dentro da store `products` ja foi encontrado!

      //Iterar pela store dos `products` para encontrar o produto que vai ser descontado
      this.products.forEach(product => {
        if (product.id == id) {
          productFound = true

          product.discount = discount
        }
      })

      if (!productFound) {
        throw new Error
      }
    },

    removeProduct(id) {
      //Filtrar a store `products` para que o produto seja removido
      this.products = this.products.filter(product => product.id != id)
    }
  }


})
