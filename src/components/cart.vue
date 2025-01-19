<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="end" min-width="536">
        <template v-slot:activator="{ props }">
            <v-badge v-if="userStore.isAuthenticated" :content="userStore.userInfo.products.length">
                <img src="../assets/shopping-cart.png" alt="">
                <v-btn v-bind="props" color="#E63946"></v-btn>
            </v-badge>
            <v-badge v-else :content="userStore.cart.length">
                <v-btn v-bind="props" color="#E63946" rounded="xl" width="25" height="40"></v-btn>
                <img src="../assets/shopping-cart.png" alt="">
            </v-badge>
        </template>

        <!--Menu do carrinho-->
        <v-card>
            
            <div v-if="userStore.isAuthenticated">
                <v-list v-for="product in userStore.userInfo.products">
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
                    <v-list-item-subtitle>{{ ticket.description }}</v-list-item-subtitle>
                    <v-btn @click="decrement(ticket)">-</v-btn>
                    <v-list-item-subtitle>{{ ticket.units }}</v-list-item-subtitle>
                    <v-btn @click="increment(ticket)">+</v-btn>
                    <v-btn @click="removeProduct(ticket)">Remover</v-btn>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>

            </div>

            <div v-else>
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
            <v-text-field label="Código de desconto" variant="solo"></v-text-field>
            <div>
                <p>Desconto(s) de código(s) promocional(s) </p>
                <p><!--Nº de desconto--></p>
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
                userStore: useUserStore(),
                productStore: useProductStore(),
                ticketStore: useTicketStore(),
                menu: false,
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
        },

        methods: {
            increment(product) {
                product.units++
            },

            decrement(product) {
                if (product.units > 1) {
                    product.units--

                }
            },

            removeProduct(product) {
                let productIndex;

                if (this.userStore.isAuthenticated) {
                    productIndex = this.userStore.userInfo.products.indexOf(product)

                    this.userStore.userInfo.products.splice(productIndex, 1)
                } else {
                    productIndex = this.userStore.cart.indexOf(product)

                    this.userStore.cart.splice(productIndex, 1)
                }
                return
            }


        },
    }
</script>

<style lang="scss" scoped>
v-btn{
    background-color: unset;
}
</style>