import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
  state: () => {
      return{
      isAuthenticated: false, //Verifica se o utilizador está autenticado
      userInfo: [], //Guarda as informações do utilizador
      //Array de utilizadores
      cart: [], //se o utilizador nao tiver conta, este array servirá para guardar os produtos que deseja comprar
      users: [{id: 1, email: "ken@123", firstName: "ken", lastName: "lukau", password: "123", badges: [], adminPermission: true, products: [], tickets: [], posts: [], userCart: []},
      {id: 2, email: "nuno@456", firstName: "nuno", lastName: "nogueira", password: "456", badges: [{id: 3, used: false, code: '#vida_social'}], adminPermission: true, products: [], tickets: [], posts: [], userCart: []},
      {id: 3, email: "sandra@789", firstName: "sandra", lastName: "moreira", password: "789", badges: [], adminPermission: true, products: [], tickets: [], posts: [], userCart: []},
      {id: 4, email: "sofia_monteiro@g", firstName: "sofia", lastName: "monteiro", password: "planta123", badges: [], adminPermission: false, products: [], tickets: [], posts: [], userCart: []},
      {id: 5, email: "isabel_almeida@g", firstName: "isabel", lastName: "almeida", password: "filhoPreferido", badges: [], adminPermission: false, products: [], tickets: [], posts: [], userCart: []} 
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
    findLastPost: (state) => state.userInfo.posts.length

  },  

  actions: {
    login(email, password) {      
      let userFound = false

      //Iterar sobre todos os users para verificar se um deles tem as mesmas credenciais que o utilizador inseriu
      this.users.forEach(user => {
        //Se tiver, o login é feito com sucesso
        if (user.email == email && user.password == password) {
          this.userInfo = user
          this.userInfo.userCart = this.cart; //Atualizar o carrinho ao fazer login
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

    addNewPost(fullName, postImage, postCaption) {
      //**
      // Adicionar uma nova publicação que pode ser vista tanto na tab "Partilhar Conteudo" no perfil do utilizador
      // como na galeria do website
      //  */      
      let userFound = false
      let newPost = {
        id: this.findLastPost + 1,
        author: fullName,
        image: postImage,
        caption: postCaption,
      }

      //Atualizar a variavel `userInfo`
      this.userInfo.posts.push(newPost)

      //Atualizar os dados na variavel `users`
      //Iterar pela store dos `users` para encontrar o utilizador que quer alterar as suas informações
      this.users.forEach(user => {
        if (user.id == this.userInfo.id) {
          userFound = true

          //Adicionar publicação
          user.posts = this.userInfo.posts
        }
      });
    },

    addItem(item) {
      //Guarda o tipo de `item` é, se é um bilhete, um pacote de bilhetes, etc.
      let userFound = false;
      let type = ''      

      if (item.title == "Pack Familiar") {
        type = "pack"
      } else if(item.description == "Bilhete individual"){
        type = "ticket"
      } else {
        type = "workshop"
      }

      let newItem = {
        id: item.id,
        type,
        title: item.title, 
        price: item.price,
        quantity: item.quantity
      }
               
      //Atualizar a variavel `userInfo`
      this.userInfo.tickets.push(newItem)
      //Atualizar os dados na variavel `users`
      //Iterar pela store dos `users` para encontrar o utilizador que quer alterar as suas informações
      this.users.forEach(user => {
        if (user.id == this.userInfo.id) {
          userFound = true

          //Adicionar publicação
          user.tickets = this.userInfo.tickets
        }
      });

    },

    verifyBadges() {
      /**
       * Esta função vai verificar se o utilizador vai receber um medalha ou não
       * medalha nº1 - Ganhar um voucher de 20% para um próximo evento ao participar em todas as workshops
       * medalha nº 2 - Obter acesso exclusivo aos bastidores ao obter um Pacote Familiar + 3 bilhetes Adicionais ao gosto
       * medalha nº 3 - Ganhar um desconto exclusivo no Catálogo ao partilhar 5 publicações!
       */
      let userFound = false;
      let badge1 = false;
      let badge2 = false;
      let badge3 = false;
      let tickets = [];

      //Verificar os medalhas que o utilizador já obteve
      this.userInfo.badges.forEach(badge => {
        if (badge.id == 1) {
          badge1 = true
        } else if (badge.id == 2) {
          badge2 = true
        } else {
          badge3 = true
        }
      });

      let newBadge = {}
      //Verificar se o utilizador ganhou um novo medalha
      for (let i = 0; i < 3; i++) {
        
        //Verificar medalha nº1
        if (i == 0 && !badge1) {
          //Obter um array só com os bilhetes de workshops
          tickets = this.userInfo.tickets.filter(ticket => ticket.type == "workshop")
          
          //Variaveis que vão verificar se os 3 tipos de workshops foram comprados pelo utilizador
          let check1 = false;
          let check2 = false;
          let check3 = false;
          tickets.forEach(ticket => {
            if (ticket.id == 1) {
              check1 = true
            } else if (ticket.id == 2) {
              check2 = true
            } else if (ticket.id == 3) {
              check3 = true
            }
          });

          if (check1 && check2 && check3) {
            newBadge = {
              id: 1,
              used: false,
              code: 'fa_de_workshops'
            }

            this.userInfo.badges.push(newBadge)
          }
          
        }

        //Verificar medalha nº2 
        if (i == 1 && !badge2) {          
          //Variaveis que vão verificar se encontram-se os requisitos para obter a 2º medalha
          let check1 = false;
          let check2 = false;

          //Obter um array só com os bilhetes para 1 pessoa
          tickets = this.userInfo.tickets.filter(ticket => ticket.type == "ticket")
          let ticketQuantity = 0

          //Verificar se o utilizador comprou pelo menos 3 bilhetes
          tickets.forEach(ticket => {
            ticketQuantity += ticket.quantity
          });
          if (ticketQuantity >= 3) {
            check1 = true
          }
          
          //Verificar se o utilizador comprou pelo menos um pacote
          if (this.userInfo.tickets.filter(ticket => ticket.type == 'pack').length > 0) {
            check2 = true
          }

          if (check1 && check2) {
            newBadge = {
              id: 2,
              used: false
            }
            this.userInfo.badges.push(newBadge)
          }
        }

        //Verificar medalha nº3
        if (i == 2 && !badge3) {
          if (this.userInfo.posts.length >= 5) {
            newBadge = {
              id: 3,
              used: false,
              code: '#vida_social'
            }

            this.userInfo.badges.push(newBadge)
          }
        }
        
      }
    },

    useBadge(id) {
      /**
       * Esta função vai expirar uma medalha/oferta que o utilizador utilizou
       */

      this.userInfo.badges.forEach(badge => {
          if (badge.id == id) {
            badge.used = true
          }
      });
    }
  }

})
