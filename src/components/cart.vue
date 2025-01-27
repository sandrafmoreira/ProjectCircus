<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end" min-width="536">
        <!--Mostra o nº de produtos que estão no carrinho-->
        <template v-slot:activator="{ props }">

            <!--Se o utilizador estiver autenticado-->
            <v-badge v-if="userStore.isAuthenticated" :content="countTotalProducts">
                <button class="cart-button" v-bind="props" color="#F4EDE4">
                    <img class="cart-icon" src="../assets/nav_img/cart-icon.svg" alt="">
                </button>
            </v-badge>
            <!--Se o utilizador não estiver autenticado-->
            <v-badge v-else :content="countTotalProducts">
                <button class="cart-button" v-bind="props" color="#F4EDE4">
                    <img class="cart-icon" src="../assets/nav_img/cart-icon.svg" alt="">
                </button>
            </v-badge>
        </template>

        <!--Menu do carrinho-->
        <v-card color="#F4EDE4" class="cart">
            <!--Se o utilizador estiver autenticado-->
            <div v-if="userStore.isAuthenticated" class="cart-list">
                <!--Produtos da giftshop adicionado-->
                <v-list v-for="product in userStore.userInfo.userCart.giftshop" class="cart-item">
                    <v-list-item class="cart-item-image">
                        <v-img :src="product.product.image" alt="Imagem de produto da giftshop"/>
                    </v-list-item>
                    <v-list-item class="cart-item-details">
                        <div class="cart-item-details-main">
                            <v-list-item-title>{{ product.product.name }}</v-list-item-title>
                            <v-list-item-title>{{  (product.units * product.product.price).toFixed(2)}} €</v-list-item-title>
                        </div>
                        <div class="cart-item-details-units">
                            <div class="units-management">
                                <button @click="decrement('giftshop', product)">-</button>
                                <v-list-item-subtitle>{{ product.units }}</v-list-item-subtitle>
                                <button @click="increment('giftshop', product)">+</button>
                            </div>
                            <button class="units-management-remove-btn" @click="removeProduct('giftshop', product)">Remover</button>
                        </div>
                    </v-list-item>
                </v-list>
                
                <!-- Bilhetes adicionados -->
                <v-list v-for="ticket in userStore.userInfo.userCart.tickets" :key="ticket.id" class="cart-item">
                    <v-list-tem class="cart-item-image">
                        <img src="/src/assets/cart_assets/tickets-icon.svg" alt="Icone de bilhete">
                    </v-list-tem>
                    <v-list-item class="cart-item-details">
                        <div class="cart-item-details-main">
                            <v-list-item-title>{{ ticket.title }}</v-list-item-title>
                            <v-list-item-title>{{  (ticket.quantity * ticket.price).toFixed(2)}} €</v-list-item-title>
                        </div>
                        <v-list-item-subtitle>{{ ticket.description }}</v-list-item-subtitle>
                        <div class="cart-item-details-units">
                            <div class="units-management">
                                <button @click="decrement('pricing', ticket)">-</button>
                                <v-list-item-subtitle>{{ ticket.quantity }}</v-list-item-subtitle>
                                <button @click="increment('pricing',ticket)">+</button>
                            </div>
                            <button class="units-management-remove-btn" @click="removeProduct('ticket', ticket)">Remover</button>
                        </div>
                    </v-list-item>
                </v-list>
                <!-- Workshops adicionados -->
                <v-list v-for="workshop in userStore.userInfo.userCart.workshops" :key="workshop.id" class="cart-item">
                    <v-list-item class="cart-item-image">
                        <img src="/src/assets/cart_assets/giftshop-ticket-icon.svg" alt="">
                    </v-list-item>
                    <v-list-item class="cart-item-details">
                        <div class="cart-item-details-main">
                            <v-list-item-title>{{ workshop.title }}</v-list-item-title>
                            <v-list-item-title>{{  (workshop.quantity * workshop.price).toFixed(2)}} €</v-list-item-title>
                        </div>
                        <v-list-item-subtitle>{{ workshop.description }}</v-list-item-subtitle>
                        <div class="cart-item-details-units">
                            <div class="units-management">
                                <button @click="decrement('pricing',workshop)">-</button>
                                <v-list-item-subtitle>{{ workshop.quantity }}</v-list-item-subtitle>
                                <button @click="increment('pricing',workshop)">+</button>
                            </div>
                            <button class="units-management-remove-btn" @click="removeProduct('workshop', workshop)">Remover</button>
                        </div>
                    </v-list-item>
                </v-list>
            </div>

            <!--Se o utilizador não estiver autenticado-->
            <div v-if="!userStore.isAuthenticated">
            <v-list v-for="product in userStore.cart.giftshop" class="cart-item">
                <v-list-item class="cart-item-image">
                        <v-img :src="product.product.image" alt="Imagem de produto da giftshop"/>
                    </v-list-item>
                    <v-list-item class="cart-item-details">
                        <div class="cart-item-details-main">
                            <v-list-item-title>{{ product.product.name }}</v-list-item-title>
                            <v-list-item-title>{{  (product.units * product.product.price).toFixed(2)}} €</v-list-item-title>
                        </div>
                        <div class="cart-item-details-units">
                            <div class="units-management">
                                <button @click="decrement('giftshop', product)">-</button>
                                <v-list-item-subtitle>{{ product.units }}</v-list-item-subtitle>
                                <button @click="increment('giftshop', product)">+</button>
                            </div>
                            <button class="units-management-remove-btn" @click="removeProduct('giftshop', product)">Remover</button>
                        </div>
                    </v-list-item>
            </v-list>

            <v-list v-for="ticket in userStore.cart.tickets" :key="ticket.id" class="cart-item">
                <v-list-tem class="cart-item-image">
                    <img src="/src/assets/cart_assets/tickets-icon.svg" alt="Icone de bilhete">
                </v-list-tem>
                <v-list-item class="cart-item-details">
                    <div class="cart-item-details-main">
                        <v-list-item-title>{{ ticket.title }}</v-list-item-title>
                        <v-list-item-title>{{  (ticket.quantity * ticket.price).toFixed(2)}} €</v-list-item-title>
                    </div>
                    <v-list-item-subtitle>{{ ticket.description }}</v-list-item-subtitle>
                    <div class="cart-item-details-units">
                        <div class="units-management">
                            <button @click="decrement('pricing', ticket)">-</button>
                            <v-list-item-subtitle>{{ ticket.quantity }}</v-list-item-subtitle>
                            <button @click="increment('pricing',ticket)">+</button>
                        </div>
                        <button class="units-management-remove-btn" @click="removeProduct('ticket', ticket)">Remover</button>
                    </div>
                </v-list-item>
            </v-list>

            <v-list v-for="workshop in userStore.cart.workshops" :key="workshop.id" class="cart-item">
                <v-list-item class="cart-item-image">
                    <img src="/src/assets/cart_assets/giftshop-ticket-icon.svg" alt="">
                </v-list-item>
                <v-list-item class="cart-item-details">
                    <div class="cart-item-details-main">
                        <v-list-item-title>{{ workshop.title }}</v-list-item-title>
                        <v-list-item-title>{{  (workshop.quantity * workshop.price).toFixed(2)}} €</v-list-item-title>
                    </div>
                    <v-list-item-subtitle>{{ workshop.description }}</v-list-item-subtitle>
                    <div class="cart-item-details-units">
                        <div class="units-management">
                            <button @click="decrement('pricing',workshop)">-</button>
                            <v-list-item-subtitle>{{ workshop.quantity }}</v-list-item-subtitle>
                            <button @click="increment('pricing',workshop)">+</button>
                        </div>
                        <button class="units-management-remove-btn" @click="removeProduct('workshop', workshop)">Remover</button>
                    </div>
                </v-list-item>
            </v-list>
            </div>

            <v-divider></v-divider>

            <v-form @submit.prevent v-if="userStore.isAuthenticated">
                <div class="form-inputs" >
                    <input type="text" label="Código de desconto" :disabled="!userStore.isAuthenticated" v-model="promoCode" class="promocode-input" placeholder="Código de Desconto">
                    <button @click="verifyDiscount">Adicionar</button>
                </div>      
                <v-select v-if="usePromoCode1" v-model="selectTicket"
                label="Selecionar Bilhete/Pacote a descontar"
                :items="getCartItems"
                item-title="title"
                item-value="id"
                @update:modelValue="useDiscount"></v-select>
                <v-select v-if="usePromoCode2" v-model="selectProduct"
                label="Selecionar Produto a descontar"
                :items="getCartItems"
                item-title="name"
                item-value="id"
                @update:modelValue="useDiscount"></v-select>
            </v-form>
                <div class="order-details">
                    <p>Desconto(s) de código(s) promocional(s) </p>
                    <p>-{{ discount }}€</p>
                </div>
                <div class="order-details">
                    <p>Subtotal</p>
                    <p>{{ calculateSubtotal }}€</p>
                </div>
                <div class="order-details">
                    <p>Taxa de envio</p>
                    <p>4.99€</p>
                </div>
                <div class="order-details">
                    <h2>Total</h2>
                    <p>{{ calculateTotal }}€</p>
                </div>
                <div class="confirmation-button">
                    <v-btn class="text-none" color="#E63946" @click="confirmOrder">Confirmar Compra
                        <v-icon  class="arrowIcon">
                            mdi-arrow-right
                        </v-icon>
                    </v-btn>
                </div>
        </v-card>
    </v-menu>
</template>

<script>
    import { useUserStore } from '@/stores/users';
    import { useProductStore } from '@/stores/products';
    import { useTicketStore } from '@/stores/ticket';

    export default {
        data() {
            return {
                //Stores
                userStore: useUserStore(),
                productStore: useProductStore(),
                ticketStore: useTicketStore(),
                //Mostrar ou não o carrinho
                menu: false,
                //Propriedades para usar um código de desconto
                promoCode: '', //String do código
                promoCodeValue: 0, //Valor do desconto do cógido promocional
                usePromoCode1: false, //Abrir/fechar v-select para o 1º código
                usePromoCode2: false, //Abrir/fechar v-select para o 2º código
                selectProduct: 0, //Guarda o id do produto selecionado
                selectTicket: 0, //Guarda o id do bilhete adicionado
                discount: 0 //Valor do valor que é descontado
            }
        },

        computed: {
            calculateSubtotal() {
                /**
                 * Calcular o subtotal dos produtos do carrinho
                 */
                let subtotal = 0;
                //Multiplicar o nº de cada produto pelo seu preço e fazer a soma de tudo
                if (this.userStore.isAuthenticated) {
                    //Produtos da Giftshop
                    this.userStore.userInfo.userCart.giftshop.forEach(product => {
                        subtotal += product.units * (product.product.price * (1 - (product.product.discount / 100)))
                    });
                    
                    //Bilhetes
                    this.userStore.userInfo.userCart.tickets.forEach(ticket => {
                        if (ticket.discount) {
                            subtotal += ticket.quantity * (ticket.price * (1 - (ticket.discount / 100)))
                        } else {
                            subtotal += ticket.quantity * ticket.price
                        }
                    })

                    //Workshops 
                    this.userStore.userInfo.userCart.workshops.forEach(ticket => {
                        subtotal += ticket.quantity * ticket.price
                    })
                } else {
                    //Produtos da Giftshop
                    this.userStore.cart.giftshop.forEach(product => {
                        subtotal += product.units * (product.product.price * (1 - (product.product.discount / 100)))
                    });
                    
                    //Bilhetes
                    this.userStore.cart.tickets.forEach(ticket => {
                        if (ticket.discount) {
                            subtotal += ticket.quantity * (ticket.price * (1 - (ticket.discount / 100)))
                        } else {
                            subtotal += ticket.quantity * ticket.price
                        }
                    })

                    //Workshops 
                    this.userStore.cart.workshops.forEach(ticket => {
                        subtotal += ticket.quantity * ticket.price
                    })
                }
                subtotal -= this.discount

                return subtotal.toFixed(2)
            },

            calculateTotal() {
                /**
                 * Calcular o preço total
                 */
                let total = parseFloat(this.calculateSubtotal) + 4.99
                return total.toFixed(2)
            },

            getCartItems() {
                /**
                 * Ao usar um codigo de desconto, esta função vai buscar e retornar
                 * os produtos da giftshop que estão dentro do carrinho do utilizador
                 */
                let productsList = []
                
                if (this.promoCode == '#vida_social') {
                    this.userStore.userInfo.userCart.giftshop.forEach(product => {                        
                        productsList.push(product.product)
                    });
                } else if (this.promoCode == 'fa_de_workshops') {
                    this.userStore.userInfo.userCart.tickets.forEach(ticket => {                        
                        productsList.push(ticket)
                    });
                }
                return productsList
            },

            countTotalProducts() {
                /**
                 * Conta o nº total de produtos no carrinho para aparecer na "badge" do carrinho
                 */
                let count = 0;

                if (this.userStore.isAuthenticated) {
                    count = this.userStore.userInfo.userCart.giftshop.length + this.userStore.userInfo.userCart.workshops.length + this.userStore.userInfo.userCart.tickets.length
                } else {
                    count = this.userStore.cart.giftshop.length + this.userStore.cart.workshops.length + this.userStore.cart.tickets.length
                }

                return count
            }
        },


        methods: {
            increment(type, product) {
                //Incrementar o nº de unidades para um produto
                if (type == 'giftshop') {
                    product.units++
                } else {
                    product.quantity++
                }
            },

            decrement(type, product) {
                 //Decrementar o nº de unidades para um produto
                 if (type == 'giftshop') {
                    if (product.units > 1) {
                        product.units--
                    }
                 } else {
                    if (product.quantity > 1) {
                        product.quantity--
                    }
                 }
            },

            removeProduct(type, product) {
                /**
                 * Remover um produto do carrinho
                 */
                let productIndex;

                if (type == 'giftshop') {
                    if (this.userStore.isAuthenticated) {
                        productIndex = this.userStore.userInfo.userCart.giftshop.indexOf(product)

                        this.userStore.userInfo.userCart.giftshop.splice(productIndex, 1)
                    } else {
                        productIndex = this.userStore.cart.giftshop.indexOf(product)

                        this.userStore.cart.giftshop.splice(productIndex, 1)
                    }
                } else if (type == 'ticket') {
                    if (this.userStore.isAuthenticated) {
                        productIndex = this.userStore.userInfo.userCart.tickets.indexOf(product)

                        this.userStore.userInfo.userCart.tickets.splice(productIndex, 1)
                    } else {
                        productIndex = this.userStore.cart.tickets.indexOf(product)

                        this.userStore.cart.tickets.splice(productIndex, 1)
                    }
                } else if (type == 'workshop') {
                    if (this.userStore.isAuthenticated) {
                        productIndex = this.userStore.userInfo.userCart.workshops.indexOf(product)

                        this.userStore.userInfo.userCart.workshops.splice(productIndex, 1)
                    } else {
                        productIndex = this.userStore.cart.workshops.indexOf(product)

                        this.userStore.cart.workshops.splice(productIndex, 1)
                    }
                }
                
            },

            verifyDiscount()  {
                /**
                 * Antes de poder usar um código, vai se verificar se o utilizador está apto para o utiilizar
                 * ou seja, se desbloqueou a oferta para o respetivo código, e também se ainda não o utilizou
                 */

                //verificar se o código de desconto esta correto
                if (this.promoCode == 'fa_de_workshops') {
                    this.userStore.userInfo.badges.forEach(badge => {
                        //verificar se o utilizador já usou o código
                        if (badge.id == 1 && !badge.used) {
                            this.usePromoCode2 = false
                            this.usePromoCode1 = true
                            this.promoCodeValue = 20
                        } else if (badge.id == 1 && badge.used) {
                            alert('Já usaste este código!')
                        }
                    });
                }
                if (this.promoCode == '#vida_social') {
                    this.userStore.userInfo.badges.forEach(badge => {
                        //verificar se o utilizador já usou o código
                        if (badge.id == 3 && !badge.used) {
                            this.usePromoCode1 = false
                            this.usePromoCode2 = true
                            this.promoCodeValue = 20
                        } else if (badge.id == 3 && badge.used) {
                            alert('Já usaste este código!')
                        }
                    });
                }
            },

            useDiscount(id) {
                /**
                 * Depois de se verificar o código, calcula-se o desconto que é dado, dependendo do produto que
                 * o utilizador seleciona onde usar o desconto
                 */
                if (this.promoCode == 'fa_de_workshops') {
                    //Vai buscar o bilhete selecionado com o id do bilhete na store dos tickets
                    let ticketSelected = this.userStore.userInfo.tickets.find(ticket => ticket.id == id)

                    //Calcular o desconto com base no valor do código de desconto
                    this.discount = ((ticketSelected.price - (1 - (this.promoCodeValue / 100)) * ticketSelected.price) * ticketSelected.quantity).toFixed(2)
                } else if (this.promoCode == '#vida_social') {
                    //Vai buscar o bilhete selecionado com o id do bilhete na store dos tickets
                    let productSelected = this.userStore.userInfo.userCart.giftshop.find(product => product.product.id == id)                
                    
                    //Calcular o desconto com base no valor do código de desconto
                    this.discount = ((productSelected.product.price - (1 - (this.promoCodeValue / 100)) * productSelected.product.price) * productSelected.units).toFixed(2)
                }
            },

            confirmOrder() {
                /**
                 * Ao confirmar-se o pedido, verifica-se se o utilizador está a utilizar algum código,
                 * e se sim, expirar o respetivo código 
                 */
                if (this.userStore.isAuthenticated) {
                    let verifyBadge = this.userStore.userInfo.badges.filter(badge => !badge.used)
                    let badgeFound = false

                    if (this.promoCode == 'fa_de_workshops') {
                        verifyBadge.forEach(badge => {
                            if (badge.id == 1 && !badge.used) {
                                this.userStore.useBadge(badge.id)
                                badgeFound = true
                            } else if(badge.id == 3 && !badgeFound) {
                                alert('Já usaste este código!')
                                return
                            }
                        });
                    } else if (this.promoCode == '#vida_social') {
                        verifyBadge.forEach(badge => {
                            if (badge.id == 3 && !badge.used) {
                                this.userStore.useBadge(badge.id)
                                badgeFound = true
                            } else if(badge.id == 3 && !badgeFound) {
                                alert('Já usaste este código!')
                                return
                            }
                        });
                    }
                    //Adicionar um produto ao histórico de produtos
                    this.userStore.userInfo.userCart.giftshop.forEach(product => {
                        let d = new Date()
                        product.date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} `
                        this.userStore.userInfo.products.push(product)
                    });

                    this.userStore.userInfo.userCart.tickets.forEach(ticket => {
                        this.ticketStore.addPurchasedTicket(ticket)
                    })

                    this.userStore.userInfo.userCart.workshops.forEach(workshop => {
                        this.ticketStore.addPurchasedWorkshop(workshop)
                    })
                }
            
                //Esvaziar o carrinho e as variáveis que gerem a compra do utilizador
                this.promoCode = ''
                this.usePromoCode1 = false
                this.promoCodeValue = 0
                this.discount = 0
                this.selectProduct = 0
                this.selectTicket = 0
                this.userStore.userInfo.userCart = {tickets: [], workshops: [], giftshop: []}
                this.userStore.cart = {tickets: [], workshops: [], giftshop: []}
                alert('Compra feita com sucesso!')
                
            }


        },
    }
</script>

<style lang="scss" scoped>


.cart{
    width: 450px;
}

.cart-list{
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.cart-item{
    display: flex;
    background-color: #f4ede4;
    padding: 0;
}

.cart-item-image{
    width: 150px;
    text-align: center;
}

.cart-item-details{
    display: flex;
    align-items: center;
}

.cart-item-details-main{
    display: flex;
    justify-content: space-between;
}

.cart-item-details-units{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}

.units-management{
    display: flex;
    align-items: center;
}

.units-management button{
    background-color: #E63946;
    color: white;
    width: 26px;
    height: 26px;
    border-radius: 40px;
    margin: 15px;
}

.units-management-remove-btn{
    background-color: #E63946;
    color: white;
    width: 100px;
    height: 30px;
    border-radius: 40px;
}

.units-management button:hover, .units-management-remove-btn:hover, .form-inputs button:hover{
    background-color: #B72636;
}

v-btn{
    background-color: unset;
}

.form-inputs{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;
}

.promocode-input{
    width: 300px;
    border: 2px solid #E9DED0;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
}

.form-inputs button{
    background-color: #E63946;
    color: white;
    border-radius: 40px;
    padding: 8px 15px;
    margin-bottom: 10px;
}

.order-details{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
}

.confirmation-button{
    display: flex;
    justify-content: flex-end;
    margin: 15px;
}
</style>