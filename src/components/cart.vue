<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end" min-width="536">
        <!--Mostra o nº de produtos que estão no carrinho-->
        <template v-slot:activator="{ props }">
            <!--Se o utilizador estiver autenticado-->
            <v-badge v-if="userStore.isAuthenticated" :content="countTotalProducts">
                <v-btn class="cart-button" v-bind="props" color="#E63946" rounded="xl"></v-btn>
                <img class="cart-icon" src="../assets/shopping-cart.png" alt="">
            </v-badge>
            <!--Se o utilizador não estiver autenticado-->
            <v-badge v-else :content="countTotalProducts">
                <v-btn class="cart-button" v-bind="props" color="#E63946" rounded="xl"></v-btn>
                <img class="cart-icon" src="../assets/shopping-cart.png" alt="">
            </v-badge>
        </template>

        <!--Menu do carrinho-->
        <v-card color="#F4EDE4" class="cart">
            <!--Se o utilizador estiver autenticado-->
            <div v-if="userStore.isAuthenticated" class="cart-list">
                <!--Produtos da giftshop adicionado-->
                <v-list v-for="product in userStore.userInfo.userCart" class="cart-item">
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
                <v-list v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id" class="cart-item">
                    <v-list-tem class="cart-item-image">
                        <img src="/src/assets/tickets-icon.svg" alt="Icone de bilhete">
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
                <v-list v-for="workshop in ticketStore.purchasedWorkshops" :key="workshop.id" class="cart-item">
                    <v-list-item class="cart-item-image">
                        <img src="/src/assets/giftshop-ticket-icon.svg" alt="">
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
            <v-list v-for="product in userStore.cart" class="cart-item">
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

            <v-list v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id" class="cart-item">
                <v-list-tem class="cart-item-image">
                    <img src="/src/assets/tickets-icon.svg" alt="Icone de bilhete">
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

            <v-list v-for="workshop in ticketStore.purchasedWorkshops" :key="workshop.id" class="cart-item">
                <v-list-item class="cart-item-image">
                    <img src="/src/assets/giftshop-ticket-icon.svg" alt="">
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

            <v-form @submit.prevent>
                <div class="form-inputs">
                    <input type="text" label="Código de desconto" :disabled="!userStore.isAuthenticated" v-model="promoCode" class="promocode-input" placeholder="Código de Desconto"></input>
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
            </v-form>
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
                promoCode: '',
                promoCodeValue: 0,
                usePromoCode1: false,
                usePromoCode2: false,
                selectProduct: 0,
                selectTicket: 0,
                discount: 0
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
                    this.userStore.userInfo.userCart.forEach(product => {
                        subtotal += product.units * (product.product.price * (1 - (product.product.discount / 100)))
                    });
                    
                    //Bilhetes
                    this.ticketStore.purchasedTickets.forEach(ticket => {
                        if (ticket.discount) {
                            subtotal += ticket.quantity * (ticket.price * (1 - (ticket.discount / 100)))
                        } else {
                            subtotal += ticket.quantity * ticket.price
                        }
                    })

                    //Workshops 
                    this.ticketStore.purchasedWorkshops.forEach(ticket => {
                        if (ticket.discount) {
                            subtotal += ticket.quantity * (ticket.price * (1 - (ticket.discount / 100)))
                        } else {
                            subtotal += ticket.quantity * ticket.price
                        }
                    })
                } else {
                    subtotal = this.userStore.cart.reduce((sum, product) => sum + (product.units * (product.product.price * (1 - (product.product.discount / 100)))), 0)
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
                    this.userStore.userInfo.userCart.forEach(product => {                        
                        productsList.push(product.product)
                    });
                } else if (this.promoCode == 'fa_de_workshops') {
                    this.ticketStore.purchasedTickets.forEach(ticket => {                        
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

                count += this.ticketStore.purchasedTickets.length
                count += this.ticketStore.purchasedWorkshops.length
                if (this.userStore.isAuthenticated) {
                    count += this.userStore.userInfo.userCart.length
                } else {
                    count += this.userStore.cart.length
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
                        productIndex = this.userStore.userInfo.userCart.indexOf(product)

                        this.userStore.userInfo.userCart.splice(productIndex, 1)
                    } else {
                        productIndex = this.userStore.cart.indexOf(product)

                        this.userStore.cart.splice(productIndex, 1)
                    }
                } else if (type == 'ticket') {
                    productIndex = this.ticketStore.purchasedTickets.indexOf(product)

                    this.ticketStore.purchasedTickets.splice(productIndex, 1)
                } else if (type == 'workshop') {
                    productIndex = this.ticketStore.purchasedWorkshops.indexOf(product)

                    this.ticketStore.purchasedWorkshops.splice(productIndex, 1)
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
                    let ticketSelected = this.ticketStore.purchasedTickets.find(ticket => ticket.id == id)

                    this.discount = ((ticketSelected.price - (1 - (this.promoCodeValue / 100)) * ticketSelected.price) * ticketSelected.quantity).toFixed(2)
                } else if (this.promoCode == '#vida_social') {
                    let productSelected = this.userStore.userInfo.userCart.find(product => product.product.id == id)                
                    
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
                    //Adicionar um produto ao histórico de produtos (this.userStore.userInfo.products)
                    this.userStore.userInfo.userCart.forEach(product => {
                        let d = new Date()
                        product.date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} `
                    });
                    //Quando a compra for bem sucedida, os produtos que estavam no carrinho passam para o historido de produtos do utilizador (userInfo.products)
                    this.userStore.userInfo.userCart.forEach(product => {
                        this.userStore.userInfo.products.push(product)
                    });
                }
            
                //Esvaziar o carrinho
                this.promoCode = ''
                this.usePromoCode1 = false
                this.promoCodeValue = 0
                this.discount = 0
                this.selectProduct = 0
                this.selectTicket = 0
                this.userStore.userInfo.userCart = []
                this.userStore.cart = []
                this.ticketStore.purchasedTickets = []
                this.ticketStore.purchasedWorkshops = []
                alert('Compra feita com sucesso!')
                
            }


        },
    }
</script>

<style lang="scss" scoped>
.cart-icon{
    position: absolute;
}

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