<template>
    <div>
        <section class="header">
            <img id="header-shape" src="@/assets/GiftshopView/header-shape.png" alt="">
            <div  style="margin-left: 60px;">
                <h1 style="font-size: 50px; margin-top: 50px;">Leva um pedaçinho <br>do nosso circo para casa!</h1>
                <br>
                <p style="font-size: 20px;">Encontre o presente perfeito e leve um pedacinho do nosso circo consigo!</p>
            </div>
            <div style="margin-left: 120px;">
                <img src="@/assets/GiftshopView/caneca-palhaço.svg" alt="">
                <img src="@/assets/GiftshopView/chapeu.svg" alt="">
                <img src="@/assets/GiftshopView/exclusive1.svg" alt="">
            </div>
        </section>


        <h1 id="catalog-title" style="margin-bottom: 30px;">Catálogo</h1>
        <section class="catalog" style="margin-left: 60px;margin-right: 60px;">
            <div class="product-card" v-for="product in productStore.products">
                <img src="@/assets/GiftshopView/card-background.svg" alt="" id="card-background-img">
                <img id="card-product-img" :src="product.image" alt="">
                <img v-if="product.exclusive" src="@/assets/GiftshopView/exclusive2.svg" alt="" id="exclusive-icon">
                <div class="card-details">
                    <h4 id="card-title">{{ product.name }}</h4>
                    <p>{{ (product.price * (1 - (product.discount / 100))).toFixed(2)}} €</p>
                </div>
                <div class="card-add-product">
                    <button id="card-btn">
                        <RouterLink id="card-btn-routerlink" :to="{name: 'gift', params: {id: product.id}}">
                            <button>Detalhes</button>
                            <v-icon>
                            mdi-arrow-right
                            </v-icon>
                        </RouterLink>
                    </button>
                    <button id="card-cart-icon" @click="addToCart(product)">
                        <img src="@/assets/GiftshopView/cart-icon.svg" alt="Icone de um Carrinho">
                    </button>
                </div>
            </div>
        </section>
    </div>

    <!-- Alerta personalizado de sucesso  -->
    <div v-if="successVisible" class="success-alert">
        <div class="cont-success-alert">
            <img src="@/assets/alerts/Produto.png" alt="" class="img-success-alert" />
            <button @click="closeSuccessAlert" class="btn-success">X</button>
        </div>
    </div>
    <!-- Alerta personalizado de sucesso  -->
    <div v-if="errorVisible" class="error-alert">
        <div class="cont-error-alert">
            <img src="@/assets/alerts/Produto.png" alt="" class="img-error-alert" />
            <button @click="closeErrorAlert" class="btn-error">X</button>
        </div>
    </div>


    <Footer></Footer>
</template>

<script>
import Footer from '@/components/Footer.vue';
import { useProductStore } from '@/stores/products';
import { useUserStore } from '@/stores/users';

    export default {
        components: {
            Footer},
     data() {
        return {
            productStore: useProductStore(),
            userStore: useUserStore(),
            successVisible: false,
            errorVisible: false 
            }
     },

     methods: {
        addToCart(product) {
            /**
             * Adicionar um produto ao carrinho
             */
            //Verificar se um produto é exclusivo, e se sim, verificar se o utilizador está autenticado
            if (product.exclusive && !this.userStore.isAuthenticated) {
                this.errorVisible = true; 
                return
            }

            //Adicionar um produto ao carrinho
            let newProduct = {
                units: 1,
                product: this.productStore.products.find(giftshopProduct => giftshopProduct.id == product.id),
                date: ''
            }

            if (this.userStore.isAuthenticated) {
                this.userStore.userInfo.userCart.giftshop.push(newProduct)
            } else {
                this.userStore.cart.giftshop.push(newProduct)
            }

            this.successVisible = true;           
        },

        /* Alertas Personalizados */
        closeSuccessAlert() {
            this.successVisible = false;
        },
        closeErrorAlert() {
            this.errorVisible = false;
        },

     },
        
    }
</script>

<style lang="scss" scoped>

/* Header */

.header{
    display: flex;
    align-content: center;
    padding: 0;
}

#header-shape{
    position: absolute;
    width: 100%;
    height: 400px;
    z-index: 0;
}

.header div{
    z-index: 1;
}

.header div:nth-of-type(1) {
    padding: 70px 50px;
}

.header div:nth-of-type(2) img{
    position: absolute;
}

.header div:nth-of-type(2) img:nth-of-type(1){
    width: 305px;
    height: 320px;
    top: 25%;
    right: 15%;
}

.header div:nth-of-type(2) img:nth-of-type(2){
    position: absolute;
    width: 140px;
    height: 120px;
    top: 51%;
    right: 27%;
}

.header div:nth-of-type(2) img:nth-of-type(3) {
    position: absolute;
    width: 100px;
    height: 84px;
    top: 24%;
    right: 15%;
}

#catalog-title{
    margin-top: 250px;
    margin-left: 60px;
}

.catalog{
    margin: auto;
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    row-gap: 50px;
    margin-left: 0;
}

.product-card{
    margin: auto;
    width: 300px;
    height: 400px;
    border: 1px solid #E9DED0;
    border-radius: 10px;
}

#card-background-img{
    position: absolute;
    z-index: 0;
}

#card-product-img{
    position: absolute;
    z-index: 1;
    width: 180px;
    height: 170px;
    margin-left: 3%;
    margin-top: 2%;
}

#exclusive-icon{
    position: absolute;
    margin-left: 210px;
}

.card-details{
    display: flex;
    justify-content: space-between;
    margin-top: 270px;
    margin-left: 10px;
    padding: 0 25px;
}

.card-add-product{
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    margin-top: 50px;
}

#card-btn{
    background-color: #E63946;
    border-radius: 50px;
}

#card-btn:hover{
    background-color: #B72636;
}

#card-btn-routerlink{
    display: flex;
    text-decoration: none;
    color: white;
}

#card-btn-routerlink button{
    margin: 0 10px;
}

#card-btn-routerlink img{
    width: 32px;
    height: 32px;
    margin: 0 10px;
}

#card-cart-icon{
    display: flex;
    align-items: center;
    background-color: #E63946;
    width: 40px;
    border-radius: 1000px;
    padding: 8px 0;
}

.v-icon{
    margin: 0 7px;
}

#card-cart-icon:hover{
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

    .error-alert {
    position: fixed;
    top: 20vh;
    right: 4vh;
    z-index: 100;
    }


    .cont-error-alert {
    position: relative;
    }


    .img-error-alert {
    width: 30vw;
    }


    .btn-error {
        background-color: #E63946;
        color: white;
        position: absolute;
        top: 20px;
        right: 20px;
        border-radius: 100px;
        padding: 5px 10px;
    }


</style>