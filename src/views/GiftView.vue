<template>
    <div>
        <v-btn @click="back"><-</v-btn>

        <div>
            <img :src="productImage" alt="">
            <h2>{{ productName }}</h2>
            <h2>{{ (productPrice * (1 - (productDiscount / 100))).toFixed(2)}}€</h2>
            <p>{{ productDesc }}</p>
            <p v-if="productExclusivity">EXCLUSIVO!</p>
        </div>            

        <div>
            <v-btn @click="decrement">-</v-btn>
            <p>{{ productUnits }}</p>
            <v-btn @click="increment">+</v-btn>

            <v-btn @click="addProduct">Add to cart</v-btn>

        </div>
    </div>

    <Footer></Footer>
</template>

<script>
import { useProductStore } from '@/stores/products';
import { useUserStore } from '@/stores/users';
import Footer from '@/components/Footer.vue';

    export default {
        components: {
            Footer,
        },
        data() {
            return {
                productStore: useProductStore(),
                userStore: useUserStore(),
                productName: '',
                productDesc: '',
                productImage: '',
                productPrice: '',
                productDiscount: 0,
                productExclusivity: '',
                productUnits: 0
                
            }
        },

        mounted () {
            this.productName = this.productStore.products.find(product => product.id == this.$route.params.id).name;
            this.productDesc = this.productStore.products.find(product => product.id == this.$route.params.id).description;
            this.productImage = this.productStore.products.find(product => product.id == this.$route.params.id).image;
            this.productPrice = this.productStore.products.find(product => product.id == this.$route.params.id).price;
            this.productDiscount = this.productStore.products.find(product => product.id == this.$route.params.id).discount;
            this.productExclusivity = this.productStore.products.find(product => product.id == this.$route.params.id).exclusive;
        },

        methods: {
            addProduct() {
                if (this.productExclusivity && !this.userStore.isAuthenticated) {
                    alert(`Precisa de se autenticar para ter acesso a este produto!`)
                    return
                }

                if (this.productUnits > 0) {
                    let newProduct = {
                        units: this.productUnits,
                        product: this.productStore.products.find(product => product.id == this.$route.params.id),
                    }

                    if (this.userStore.isAuthenticated) {
                        this.userStore.userInfo.products.push(newProduct)
                    } else {
                        this.userStore.cart.push(newProduct)
                    }

                    alert("Produto adicionado ao carrinho!")
                    this.productUnits = 0 
                }
            },

            back() {
                this.$router.push({name: 'giftshop'})
            },

            increment() {
                this.productUnits++
            },

            decrement() {
                if (this.productUnits > 0) {
                    this.productUnits--

                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>