import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore("news", {
  state: () => {
    return{ 
      articles: [
        {id: 1, src:"/src/assets/NewsView/1.png", author: 'Serafim Fernandes', date:'06/12/24', title: 'O circo sustentável', text: 'O circo está a tornar-se um exemplo brilhante de como tradição e inovação podem coexistir. Com práticas que alinham criatividade e responsabilidade ambiental. Os circos modernos estão a mostrar que é possível oferecer entretenimento de qualidade enquanto cuidamos do planeta!'},
        {id: 2, src:"/src/assets/NewsView/2.png", author: 'Maria Costa', date:'08/01/25', title: 'Cenários de materiais reciclados', text: 'Nesta edição, o circo prova que sustentabilidade e criatividade podem andar de mãos dadas. Todos os cenários foram cuidadosamente elaborados com materiais reciclados e reutilizáveis, sem comprometer a beleza e o encanto visual! '},
        {id: 3, src:"/src/assets/NewsView/3.png", author: 'Ana Pereira', date:'21/01/25', title: 'Workshops que encantam!', text: 'O entusiasmo para esta edição especial do nosso circo está maior do que nunca! Com atrações inovadoras, como workshops interativos e espetáculos sustentáveis, os bilhetes têm sido adquiridos a um ritmo impressionante.'},
      ]
    }
  },
  persist: {
    storage: localStorage,
    pick: ['articles'],
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify
    }
  },

  getters: {
    findLastArticle: (state) => state.articles[state.articles.length - 1].id,
  },

  actions: {
    addArticle(title, text, author, date, image) {            
      //Verificar se ja existe um artigo com o mesmo nome
      if (this.articles.some((article) => article.title == title)) {
        throw new Error
      }

      let newArticle = {
        id: this.findLastArticle + 1,
        src: `/src/assets/NewsView/${image}`,
        author,
        date,
        title,
        text,
      }

      this.articles.push(newArticle)
    },

    removeArticle(id) {
      //Filtrar a store `products` para que o produto seja removido
      this.articles = this.articles.filter(article => article.id != id)
    },

    editArticle(id, title, text, author, date, image) {
      let articleFound = false //Para detetar se um produto com o mesmo id dentro da store `products` ja foi encontrado!

      this.articles.forEach(article => {
        if (article.id == id) {
          articleFound = true

          article.title = title
          article.text = text
          article.src = `/src/assets/NewsView/${image}`
          article.author = author
          article.date = date
        }
      });      

      if (!articleFound) {
        throw new Error
      }
    }
  }

})
