import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore("authentication", {
  state: () => {
    return{ 
      //Variavel que verifica se o utilizador está autenticado
      isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    }
  },

  actions: {
    login(userInformation) {
      
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true); //Para ficar também na localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInformation));
    },

    logout() {
      this.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false); //Para ficar também na localStorage
    }
  }

})
