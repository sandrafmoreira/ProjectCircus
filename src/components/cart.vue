<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end" min-width="536">
        <!--Mostra o nº de produtos que estão no carrinho-->
        <template v-slot:activator="{ props }">
            <!--Se o utilizador estiver autenticado-->
            <v-badge v-if="userStore.isAuthenticated" :content="userStore.userInfo.userCart.length">
                <img src="../assets/shopping-cart.png" alt="">
                <v-btn v-bind="props" color="#E63946"></v-btn>
            </v-badge>
            <!--Se o utilizador não estiver autenticado-->
            <v-badge v-else :content="userStore.cart.length">
                <v-btn v-bind="props" color="#E63946" rounded="xl" width="25" height="40"></v-btn>
                <img src="../assets/shopping-cart.png" alt="">
            </v-badge>
        </template>

        <!--Menu do carrinho-->
        <v-card>
            <!--Se o utilizador estiver autenticado-->
            <div v-if="userStore.isAuthenticated">
                <v-list v-for="product in userStore.userInfo.userCart">
                    <v-list-item v-if="product.title == 'Malabarismo Sustentável' || product.title == 'Oficina de Acrobacias' || product.title == 'Técnicas de Palhaçaria'" >
                        <!-- <v-img :src="product.product.image" alt="" max-width="50"/> -->
                        <v-list-item-title>{{ product.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{  (product.quantity * product.price).toFixed(2)}} €</v-list-item-subtitle>
                        <v-btn @click="decrement(product)">-</v-btn>
                        <v-list-item-subtitle>{{ product.quantity }}</v-list-item-subtitle>
                        <v-btn @click="increment(product)">+</v-btn>
                        <v-btn @click="removeProduct(product)">Remover</v-btn>
                        <v-divider></v-divider>
                    </v-list-item>
                    <v-list-item v-else-if="product.title == 'Adulto' || product.title == 'Criança' || product.title == 'Pack Familiar'" >
                        <!-- <v-img :src="product.product.image" alt="" max-width="50"/> -->
                        <v-list-item-title>{{ product.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{  (product.quantity * product.price).toFixed(2)}} €</v-list-item-subtitle>
                        <v-btn @click="decrement(product)">-</v-btn>
                        <v-list-item-subtitle>{{ product.quantity }}</v-list-item-subtitle>
                        <v-btn @click="increment(product)">+</v-btn>
                        <v-btn @click="removeProduct(product)">Remover</v-btn>
                        <v-divider></v-divider>
                    </v-list-item>
                    <v-list-item v-else>
                        <v-img :src="product.product.image" alt="" max-width="50"/>
                        <v-list-item-title>{{ product.product.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{  (product.units * product.product.price).toFixed(2)}} €</v-list-item-subtitle>
                        <v-btn @click="decrement(product)">-</v-btn>
                        <v-list-item-subtitle>{{ product.units }}</v-list-item-subtitle>
                        <v-btn @click="increment(product)">+</v-btn>
                        <v-btn @click="removeProduct(product)">Remover</v-btn>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
                
                <!-- Bilhetes adicionados -->
                <v-list v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id">
                    <img src="/src/assets/Bilhetes.png" alt="">
                    <v-list-item>
                        <v-list-item-title>{{ ticket.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ ticket.description }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ ticket.units }}</v-list-item-subtitle>
                        <v-btn @click="removeProduct(ticket)">Remover</v-btn>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
                <!-- Workshops adicionados -->
                <v-list v-for="workshop in ticketStore.purchasedWorkshops" :key="workshop.id">
                    <v-list-item>
                        <v-list-item-title>{{ workshop.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ workshop.description }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ workshop.units }}</v-list-item-subtitle>
                        <v-btn @click="removeProduct(workshop)">Remover</v-btn>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>

            </div>

            <!--Se o utilizador não estiver autenticado-->
            <div v-if="!userStore.isAuthenticated">
            <v-list v-for="product in userStore.cart">
                <v-list-item>
                    <v-img :src="product.product.image" alt="" max-width="50"/>
                    <v-list-item-title>{{ product.product.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ (product.product.price * (1 - (product.product.price / 100))).toFixed(2)}} €</v-list-item-subtitle>
                    <v-btn @click="decrement(product)">-</v-btn>
                    <v-list-item-subtitle>{{ product.units }}</v-list-item-subtitle>
                    <v-btn @click="increment(product)">+</v-btn>
                    <v-btn @click="removeProduct(product)">Remover</v-btn>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>

            <v-list v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id">
                <v-list-item>
                    <v-list-item-title>{{ ticket.title }}</v-list-item-title>
                    <v-btn @click="decrement(ticket)">-</v-btn>
                    <v-list-item-subtitle>{{ ticket.units }}</v-list-item-subtitle>
                    <v-btn @click="increment(ticket)">+</v-btn>
                    <v-btn @click="removeProduct(ticket)">Remover</v-btn>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
            </div>

            <v-divider></v-divider>

            <v-form>
                <v-text-field label="Código de desconto" variant="solo" :disabled="!userStore.isAuthenticated" v-model="promoCode"></v-text-field>
                <v-btn @click="verifyDiscount">Adicionar</v-btn>
                <v-select v-if="usePromoCode" v-model="selectProduct"
                label="Selecionar Produto a descontar"
                :items="getCartItems"
                item-title="name"
                item-value="id"
                @update:modelValue="useDiscount"
                ></v-select>
                <div>
                    <p>Desconto(s) de código(s) promocional(s) </p>
                    <p>-{{ discount }}€</p>
                </div>
                <div>
                    <p>Subtotal</p>
                    <p>{{ calculateSubtotal }}€</p>
                </div>
                <div>
                    <p>Taxa de envio</p>
                    <p>4.99€</p>
                </div>
                <div>
                    <h2>Total</h2>
                    <p>{{ calculateTotal }}€</p>
                </div>
                <v-btn class="text-none" color="#E63946" @click="confirmOrder">Confirmar Compra
                        
                        <v-icon  class="arrowIcon">
                            mdi-arrow-right
                        </v-icon>
                </v-btn>
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
                usePromoCode: false,
                selectProduct: 0,
                discount: 0
            }
        },

        computed: {
            calculateSubtotal() {
                /**
                 * Calcular o subtotal dos produtos do carrinho
                 */
                let subtotal;
                //Multiplicar o nº de cada produto pelo seu preço e fazer a soma de tudo
                if (this.userStore.isAuthenticated) {
                    subtotal = this.userStore.userInfo.products.reduce((sum, product) => sum + (product.units * (product.product.price * (1 - (product.product.discount / 100)))), 0)
                } else {
                    subtotal = this.userStore.cart.reduce((sum, product) => sum + (product.units *(product.product.price * (1 - (product.product.discount / 100)))), 0)
                }
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
                this.userStore.userInfo.userCart.forEach(product => {
                    productsList.push(product.product)
                });
                return productsList
            } 
        },

        methods: {
            increment(product) {
                //Incrementar o nº de unidades para um produto
                product.units++
            },

            decrement(product) {
                 //Decrementar o nº de unidades para um produto
                if (product.units > 1) {
                    product.units--

                }
            },

            removeProduct(product) {
                /**
                 * Remover um produto do carrinho
                 */
                let productIndex;

                if (this.userStore.isAuthenticated) {
                    productIndex = this.userStore.userInfo.products.indexOf(product)

                    this.userStore.userInfo.products.splice(productIndex, 1)
                } else {
                    productIndex = this.userStore.cart.indexOf(product)

                    this.userStore.cart.splice(productIndex, 1)
                }
            },
            verifyDiscount()  {
                /**
                 * Antes de poder usar um código, vai se verificar se o utilizador está apto para o utiilizar
                 * ou seja, se desbloqueou a oferta para o respetivo código, e também se ainda não o utilizou
                 */
                let verifyBadge = this.userStore.userInfo.badges.filter(badge => !badge.used)

                //verificar se o código de desconto esta correto
                if (this.promoCode == 'fa_de_workshops') {
                    verifyBadge.forEach(badge => {
                        //verificar se o utilizador já usou o código
                        if (badge.id == 1 && !badge.used) {
                            this.usePromoCode = true
                            this.promoCodeValue = 20
                        } else if (badge.id == 1 && badge.used) {
                            alert('Já usaste este código!')
                        }
                    });
                }
                if (this.promoCode == '#vida_social') {
                    verifyBadge.forEach(badge => {
                        //verificar se o utilizador já usou o código
                        if (badge.id == 3 && !badge.used) {
                            this.usePromoCode = true
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
                    let ticketSelected = this.userStore.userInfo.userCart.find()
                } else if (this.promoCode == '#vida_social') {
                    let productSelected = this.userStore.userInfo.userCart.find(product => product.product.id == id)                
                    
                    this.discount = (productSelected.product.price -((1 - (this.promoCodeValue / 100)) * productSelected.product.price)).toFixed(2)
                }
            },

            confirmOrder() {
                /**
                 * Ao confirmar-se o pedido, verifica-se se o utilizador está a utilizar algum código,
                 * e se sim, expirar o respetivo código 
                 */
                let verifyBadge = this.userStore.userInfo.badges.filter(badge => !badge.used)
                let badgeFound = false

                if (this.promoCode == '#fa_de_workshops') {
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
                //Esvaziar o carrinho
                this.promoCode = ''
                this.usePromoCode = false
                this.promoCodeValue = 0
                this.discount = 0
                this.selectProduct = 0
                this.userStore.userInfo.userCart = []
                alert('Compra feita com sucesso!')
                
            }


        },
    }
</script>

<style lang="scss" scoped>
v-btn{
    background-color: unset;
}
</style>