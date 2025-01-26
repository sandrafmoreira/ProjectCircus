import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore("ticket", {
  state: () => {
    return {
        purchasedTickets: [],
        purchasedWorkshops: [],
        availableTickets: [
            { id: 1, zone:"C", title: "Adulto", description: "Bilhete individual", price: 12, quantity: 0, discount: 0},
            { id: 2, zone:"C", title: "Criança", description: "Bilhete individual", price: 8, quantity: 0, discount: 0 },
            { id: 3, zone:"C", title: "Pack Familiar", description: "2 adultos 2 crianças", price: 30, quantity: 0, discount: 0},
            { id: 4, zone:"B", title: "Adulto", description: "Bilhete individual", price: 15, quantity: 0, discount: 0 },
            { id: 5, zone:"B", title: "Criança", description: "Bilhete individual", price: 12, quantity: 0, discount: 0 },
            { id: 6, zone:"B", title: "Pack Familiar", description: "2 adultos 2 crianças", price: 40, quantity: 0,discount: 0 },
            { id: 7, zone:"A", title: "Adulto", description: "Bilhete individual", price: 20, quantity: 0, discount: 0 },
            { id: 8, zone:"A", title: "Criança", description: "Bilhete individual", price: 15, quantity: 0, discount: 0 },
            { id: 9, zone:"A", title: "Pack Familiar", description: "2 adultos 2 crianças", price: 50, quantity: 0, discount: 0 },
        ],
        availableWorkshops: [
            { id: 1, title: "Malabarismo Sustentável", description: "Limite de pessoas: 30", price: 4, quantity: 0 },
            { id: 2, title: "Oficina de Acrobacias", description: "Limite de pessoas: 15", price: 6, quantity: 0 },
            { id: 3, title: "Técnicas de Palhaçaria", description: "Limite de pessoas: 30", price: 4, quantity: 0 },
        ],
    }
  },

  persist: {
    storage: localStorage,
    pick: ['purchasedTickets', 'purchasedWorkshops', 'availableTickets', 'availableWorkshops'],
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify
    }
  },

  actions: {
    addPurchasedTicket(ticket) {
        this.purchasedTickets.push(ticket)
    },
    addPurchasedWorkshop(workshop) {
        this.purchasedWorkshops.push(workshop)
    }
  }


})