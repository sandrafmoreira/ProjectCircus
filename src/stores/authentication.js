import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore("authentication", {
  state: () => {
    return{ 
      isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false, //Verifica se o utilizador está autenticado
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || [], //Guarda as informações do utilizador
      //Array de utilizadores
      users: JSON.parse(localStorage.getItem("users")) || [{email: "ken@123", firstName: "ken", lastName: "lukau", password: "123", badges: [], adminPermission: true, products: [], tickets: [], posts: []},
      {email: "nuno@456", firstName: "nuno", lastName: "nogueira", password: "456", badges: [], adminPermission: true, products: [], tickets: [], posts: []},
      {email: "sandra@789", firstName: "sandra", lastName: "moreira", password: "789", badges: [], adminPermission: true, products: [], tickets: [], posts: []}
    ],
    }
  },

  actions: {
    login(email, password) {      
      let userFound = false

      //Iterar sobre todos os users para verificar se um deles tem as mesmas credenciais que o utilizador inseriu
      this.users.forEach(user => {
        //Se tiver, o login é feito com sucesso
        if (user.email == email && user.password == password) {
          this.userInfo = user
          userFound =  true 
          
          this.isAuthenticated = true; //O utilizador está autenticado
          //Guardar a informação na localStorage
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        } 
      });

      //Se nenhum utilizador foi encontrado, vai lançar um erro para ser mostrado na pagina
      if (!userFound) {
        throw new Error
      }
      

    },

    signUp(email, firstName, lastName, password) {  
      //Verificar se um dos utilizadores ja existentes ja usa o email que foi inserido
      if(this.users.some((user) => user.email == email)) {
        //Se sim, e mostrada uma mensagem de erro
        throw new Error
      }
      //Se nao, um novo utilizador e criado
      let newUser = {
        email,
        firstName,
        lastName,
        password,
        badges: [],
        adminPermission: false,
        products: [],
        tickets: [],
        posts: [],
      };

      //Colocar o novo utilizador na store `users`
      this.users.push(newUser)

      //Atualizar a localStorage
      localStorage.setItem("users", JSON.stringify(this.users))
  },

    editInformation(oldEmail, newEmail, firstName, lastName, password) {
      let userFound = false //Para detetar se um utilizador com o mesmo email dentro da store `users` ja foi encontrado!
      
      //Iterar pela store dos `users` para encontrar o utilizador que quer alterar as suas informações
      this.users.forEach(user => {
        if (user.email == oldEmail) {
          userFound = true

          //Alterar todas as informações do utilizador
          user.email = newEmail;
          user.firstName = firstName;
          user.lastName = lastName;
          user.password = password;

          //Atualizar as informações na localStorage
          localStorage.setItem("userInfo", JSON.stringify(user));
          localStorage.setItem("users", JSON.stringify(this.users))
        }
      });

      //Se nenhum utilizador foi encontrado, vai lançar um erro para ser mostrado na pagina
      if (!userFound) {
        throw new Error
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.userInfo = []
      localStorage.setItem("isAuthenticated", false); //Atualizar a localStorage
      localStorage.removeItem("userInfo")
    },

    removeAccount(userEmail) {   
      //Filtrar a store `users` para que o user que quer remover a sua conta seja removido 
      this.users = this.users.filter(user => user.email != userEmail)

      //Atualizar a localStorage
      localStorage.setItem("users", JSON.stringify(this.users))
    }
  }

})
