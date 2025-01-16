import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore("ticket", {
  state: () => {
    return {
        purchasedTickets: [],
        purchasedWorkshops: []
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