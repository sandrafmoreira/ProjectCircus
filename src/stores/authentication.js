import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore("authentication", {
  state: () => {
    return{ 
      //Variavel que verifica se o utilizador está autenticado
      isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated"))
    }
  },

  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true); //Para ficar também na localStorage
    },

    logout() {
      this.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false); //Para ficar também na localStorage
    }
  }

})
