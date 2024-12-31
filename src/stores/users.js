import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
  state: () => {
      return{
      isAuthenticated: false, //Verifica se o utilizador está autenticado
      userInfo: [], //Guarda as informações do utilizador
      //Array de utilizadores
      cart: [], //se o utilizador nao tiver conta, este array servirá para guardar os produtos que deseja comprar
      users: [{id: 1, email: "ken@123", firstName: "ken", lastName: "lukau", password: "123", badges: ['badge1'], adminPermission: true, products: [], tickets: [], posts: []},
      {id: 2, email: "nuno@456", firstName: "nuno", lastName: "nogueira", password: "456", badges: ['badge1','badge2'], adminPermission: true, products: [], tickets: [], posts: []},
      {id: 3, email: "sandra@789", firstName: "sandra", lastName: "moreira", password: "789", badges: ['badge2','badge3'], adminPermission: true, products: [], tickets: [], posts: []},
      {id: 4, email: "sofia_monteiro@g", firstName: "sofia", lastName: "monteiro", password: "planta123", badges: ['badge3'], adminPermission: false, products: [], tickets: [], posts: []},
      {id: 5, email: "isabel_almeida@g", firstName: "isabel", lastName: "almeida", password: "filhoPreferido", badges: [], adminPermission: false, products: [], tickets: [], posts: []} 
    ],
  }
    },
    persist: {
      storage: localStorage,
      pick: ['isAuthenticated','userInfo','users', 'cart'],
      serializer: {
        deserialize: JSON.parse,
        serialize: JSON.stringify
      }
    },
    
  getters: {
    fullName: (state) => state.userInfo.firstName + " " + state.userInfo.lastName, //Obter o nome completo do utilizador
    usersNum: (state) => state.users.length, //Numero total de utilizadores
    findLastUser: (state) => state.users[state.users.length - 1].id, //ID do utilizador na ultima posicao da store

  },  

  actions: {
    login(email, password) {      
      let userFound = false

      //Iterar sobre todos os users para verificar se um deles tem as mesmas credenciais que o utilizador inseriu
      this.users.forEach(user => {
        //Se tiver, o login é feito com sucesso
        if (user.email == email && user.password == password) {
          this.userInfo = user
          this.userInfo.products = this.cart; //Atualizar o carrinho ao fazer login
          this.cart = ''
          userFound =  true 
          
          this.isAuthenticated = true; //O utilizador está autenticado
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
        id: this.findLastUser + 1,
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
  },

    editInformation(id, email, firstName, lastName, password) {
      let userFound = false //Para detetar se um utilizador com o mesmo email dentro da store `users` ja foi encontrado!
      
      if (email != this.userInfo.email) {
        //Ao alterar o email, tem que se verificar se o novo email nao esta a ser utilizado por outra pessoa
        let emailInUse = this.users.some(user => user.id !== id && user.email === email);

        if (emailInUse) {
          throw new Error
        }
      }

      //Iterar pela store dos `users` para encontrar o utilizador que quer alterar as suas informações
      this.users.forEach(user => {
        if (user.id == id) {
          userFound = true


          //Alterar todas as informações do utilizador
          user.email = email;
          user.firstName = firstName;
          user.lastName = lastName;
          user.password = password;

          this.userInfo.email = email
          this.userInfo.firstName = firstName;
          this.userInfo.lastName = lastName;
          this.userInfo.password = password;
        }
      });

      //Se nenhum utilizador foi encontrado, vai lançar um erro para ser mostrado na pagina
      if (!userFound) {
        throw new Error
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.cart = this.userInfo.products
      this.userInfo = [];
    },

    removeAccount(id) {   
      //Filtrar a store `users` para que o utilizador seja removido 
      this.users = this.users.filter(user => user.id != id)
      //Atualizar a localStorage
    },

    getBadge(badge) {
      this.users.forEach(user => {
        if (user.id == id) {
          userFound = true


          //Alterar todas as informações do utilizador
          user.badges.push(badge)

          this.userInfo.badges.push(badge)
        }
      });
    }
  }

})
