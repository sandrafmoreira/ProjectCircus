import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore("news", {
  state: () => {
    return{ 
      articles: [
        {id: 1, src:"/src/assets/NewsView/1.png", title: 'O circo sustentável', text: 'O circo está a tornar-se um exemplo brilhante de como tradição e inovação podem coexistir. Com práticas que alinham criatividade e responsabilidade ambiental. Os circos modernos estão a mostrar que é possível oferecer entretenimento de qualidade enquanto cuidamos do planeta!'},
        {id: 2, src:"/src/assets/NewsView/2.png", title: 'Cenários de materiais reciclados', text: 'Nesta edição, o circo prova que sustentabilidade e criatividade podem andar de mãos dadas. Todos os cenários foram cuidadosamente elaborados com materiais reciclados e reutilizáveis, sem comprometer a beleza e o encanto visual! '},
        {id: 3, src:"/src/assets/NewsView/3.png", title: 'Workshops que encantam!', text: 'O entusiasmo para esta edição especial do nosso circo está maior do que nunca! Com atrações inovadoras, como workshops interativos e espetáculos sustentáveis, os bilhetes têm sido adquiridos a um ritmo impressionante.'},
      ]
    }
  },

})
