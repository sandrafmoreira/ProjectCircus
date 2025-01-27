<template>
    <div>
        <div class="go-back-section">
            <button @click="back">
                <v-icon>
                    mdi-arrow-left
                </v-icon>
            </button>
            <h2>Catálogo / {{ productName }}</h2>
        </div>    

        <div class="product">
            <div class="product-image">
                <img :src="productImage" alt="">
            </div>
            <div class="product-details">
                <div class="product-details-name">
                    <h2>{{ productName }}</h2>
                    <h2>{{ (productPrice * (1 - (productDiscount / 100))).toFixed(2)}}€</h2>
                </div>
                <p>{{ productDesc }}</p>
                <div class="product-details-buy-section">
                    <div class="buy-section-units">
                        <button @click="decrement">-</button>
                        <p>{{ productUnits }}</p>
                        <button @click="increment">+</button>
                    </div>
                    <button id="add-product" @click="addProduct">Adicionar ao carrinho</button>
                </div>
            </div>
        </div>            

    </div>


    <!-- Alerta personalizado de sucesso  -->
    <div v-if="successVisible" class="success-alert">
        <div class="cont-success-alert">
            <img src="@/assets/alerts/Produto.png" alt="" class="img-success-alert" />
            <button @click="closeSuccessAlert" class="btn-success">X</button>
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
                //Stores
                productStore: useProductStore(),
                userStore: useUserStore(),
                //Atributos de um produto
                productName: '',
                productDesc: '',
                productImage: '',
                productPrice: '',
                productDiscount: 0,
                productExclusivity: '',
                productUnits: 0,
                successVisible: false //alerta personalizado
                
            }
        },

        mounted () {
            /**
             * Dependendo do id do produto selecionado, vai buscar todos os detalhes sobre esse produto
             */
            this.productName = this.productStore.products.find(product => product.id == this.$route.params.id).name;
            this.productDesc = this.productStore.products.find(product => product.id == this.$route.params.id).description;
            this.productImage = this.productStore.products.find(product => product.id == this.$route.params.id).image;
            this.productPrice = this.productStore.products.find(product => product.id == this.$route.params.id).price;
            this.productDiscount = this.productStore.products.find(product => product.id == this.$route.params.id).discount;
            this.productExclusivity = this.productStore.products.find(product => product.id == this.$route.params.id).exclusive;
        },

        methods: {
            addProduct() {
                /**
                 * Adicionar um produto ao carrinho
                 */
                //Verificar se um produto é exclusivo, e se sim, verificar se o utilizador está autenticado
                if (this.productExclusivity && !this.userStore.isAuthenticated) {
                    alert(`Precisa de se autenticar para ter acesso a este produto!`)
                    return
                }

                //Adicionar um produto ao carrinho
                if (this.productUnits > 0) {
                    let newProduct = {
                        units: this.productUnits,
                        product: this.productStore.products.find(product => product.id == this.$route.params.id),
                        date: ''
                    }

                    if (this.userStore.isAuthenticated) {
                        this.userStore.userInfo.userCart.giftshop.push(newProduct)
                    } else {
                        this.userStore.cart.giftshop.push(newProduct)
                    }

                    this.successVisible = true; //para aparecer o alerta personalizado
                    this.productUnits = 0 
                }
            },

            back() {
                /**
                 * Voltar para a página da Giftshop
                 */
                this.$router.push({name: 'giftshop'})
            },

            increment() {
                /**
                 * Incrementar o nº de produtos para adicionar ao carrinho
                 */
                this.productUnits++
            },

            decrement() {
                /**
                 * Decrementar o nº de produtos para adicionar ao carrinho
                 */
                if (this.productUnits > 0) {
                    this.productUnits--

                }
            },

            /* Alertas Personalizados */
            closeSuccessAlert() {
                this.successVisible = false;
            },

        },
    }
</script>

<style lang="scss" scoped>
.go-back-section{
    display: flex;
    margin-top: 5%;
    padding: 40px 50px;
    gap: 30px;
}

.go-back-section button{
    background-color: #E63946;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 30px;
}

.go-back-section button img{
    width: 26px;
    height: 26px;
}

.go-back-section button:hover {
    background-color: #B72636;
}

.product{
    display: flex;
}

.product-image, .product-details{
    width: 50%;
    display: flex;
    justify-content: center;
}

.product-image img{
    width: 300px;
    height: 300px;
}

.product-details{
    display: flex;
    flex-direction: column;
    width: 500px;
}

.product-details-name{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.product-details-buy-section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
}

.buy-section-units{
    display: flex;
    align-items: center;
}

.buy-section-units button{
    background-color: #E63946;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 40px;
    margin: 15px;
}

.buy-section-units button:hover{
    background-color: #B72636;
}

.buy-section-units p{
    font-size: 24px;
}

#add-product{
    background-color: #E63946;
    color: white;
    width: 200px;
    height: 40px;
    border-radius: 30px;
}

#add-product:hover{
    background-color: #B72636;
}


    /* Alerta personalizado */
    .success-alert {
    position: fixed;
    top: 20vh;
    right: 4vh;
    z-index: 100;
    }


    .cont-success-alert {
    position: relative;
    }


    .img-success-alert {
    width: 30vw;
    }


    .btn-success {
        background-color: #E63946;
        color: white;
        position: absolute;
        top: 20px;
        right: 20px;
        border-radius: 100px;
        padding: 5px 10px;
    }

</style>