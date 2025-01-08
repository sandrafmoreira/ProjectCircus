import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore("ticket", {
  state: () => {
    return {
        purchasedTickets: []
    }
  },

  actions: {
    addPurchasedTicket(ticket) {
        this.purchasedTickets.push(ticket)
    }
  }


})