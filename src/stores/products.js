import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore("product", {
  state: () => {
    return{ 
      //Array default de produtos
      products: [
        {id: 1, 
        name: "Caneca de Palhaço", 
        description: "Uma divertida e charmosa caneca em forma de palhaço, perfeita para trazer um toque de alegria ao seu dia. Com detalhes coloridos e uma expressão amigável, é ideal para os amantes do circo e do design único!", 
        price: 18, 
        image: "/src/assets/GiftshopView/caneca-palhaço.svg", 
        discount: 0, 
        exclusive: true},
        {id: 2, 
          name: "Pins", 
          description: "Acessórios perfeitos para expressar sua personalidade e dar destaque ao seu estilo. Criados com atenção aos detalhes, eles apresentam designs exclusivos e acabamento premium, garantindo durabilidade e charme.", 
          price: 7, 
          image: "/src/assets/GiftshopView/pins.svg", 
          discount: 0, 
          exclusive: false},
        {id: 3, 
          name: "Chapéu", 
          description: "Um chapéu estiloso que combina funcionalidade e estética, sendo o acessório perfeito para destacar o visual em qualquer ocasião. Fabricado com materiais leves e confortáveis, adiciona um toque personalizado ao seu look.",
          price: 10, 
          image: "/src/assets/GiftshopView/chapeu.svg", 
          discount: 0, 
          exclusive: false},
        {id: 4, 
          name: "Pulseiras", 
          description: "Um acessório ideal para marcar ocasiões memoráveis e criar uma conexão especial. Feitas com materiais confortáveis e resistentes, elas combinam estilo e significado, tornando-se lembranças perfeitas para eventos, festas ou momentos importantes.", 
          price: 5, 
          image: "/src/assets/GiftshopView/pulseiras.svg", 
          discount: 0, 
          exclusive: false
        },
        {
          id: 5,
          name: "Bandeiras",
          description: "Capture a essência de qualquer evento com nossas bandeiras vibrantes e temáticas. Confeccionadas com materiais de alta qualidade, estas bandeiras são ideais para decoração, sinalização ou simplesmente para adicionar um toque de cor ao ambiente.",
          price: 18,
          image: "/src/assets/GiftshopView/bandeiras.svg",
          discount: 0,
          exclusive: false
        },
        {
          id: 6,
          name: "Ornamento",
          description: "Este ornamento decorativo foi projetado para trazer beleza e singularidade ao seu espaço. Combinando elegância e um design atemporal, ele é ideal para decorar interiores, criar cenários temáticos ou dar um toque especial a celebrações e eventos.",
          price: 3,
          image: "/src/assets/GiftshopView/ornamento.svg",
          discount: 5,
          exclusive: false
        },
        {
          id: 7,
          name: "Póster",
          description: "Perfeito para adicionar um toque mágico e divertido a qualquer ambiente. Com um design vibrante e colorido, ele retrata a atmosfera clássica de um circo, com uma grande tenda vermelha e branca, uma roda-gigante e um céu azul com nuvens.",
          price: 12,
          image: "/src/assets/GiftshopView/poster.svg",
          discount: 0,
          exclusive: false
        },
        {
          id: 8,
          name: "Tote Bag",
          description: "Mais do que um acessório, é uma escolha prática e sustentável para o seu dia a dia. Feita com materiais de qualidade e durabilidade, ela oferece espaço amplo para carregar itens essenciais enquanto mantém o estilo.",
          price: 5,
          image: "/src/assets/GiftshopView/tote-bag.svg",
          discount: 15,
          exclusive: true
        }
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
        image: `src/assets/GiftshopView/${image}`,
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
    },

    editProduct(id, name, description, price, exclusive, image, discount) {
      let productFound = false //Para detetar se um produto com o mesmo id dentro da store `products` ja foi encontrado!

      this.products.forEach(product => {
        if (product.id == id) {
          productFound = true

          product.name = name
          product.description = description
          product.price = price
          product.exclusive = exclusive
          product.image = image
          product.discount = discount
        }
      });      

      if (!productFound) {
        throw new Error
      }
    }
  }


})
