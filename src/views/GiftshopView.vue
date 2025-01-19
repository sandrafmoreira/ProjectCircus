<template>
    <div>
        <section class="header">
            <img id="header-shape" src="@/assets/GiftshopView/header-shape.png" alt="">
            <div>
                <h1>Leva um pedacinho do nosso circo para casa!</h1>
                <br>
                <p>Encontre o presente perfeito e leve um pedacinho do nosso circo consigo!</p>
            </div>
            <div>
                <img src="@/assets/GiftshopView/caneca-palhaço.svg" alt="">
                <img src="@/assets/GiftshopView/chapeu.svg" alt="">
                <img src="@/assets/GiftshopView/exclusive1.svg" alt="">
            </div>
        </section>


        <h1 id="catalog-title">Catálogo</h1>
        <section class="catalog">
            <div class="product-card" v-for="product in productStore.products">
                <img src="@/assets/GiftshopView/card-background.svg" alt="" id="card-background-img">
                <img id="card-product-img" :src="product.image" alt="">
                <img v-if="product.exclusive" src="@/assets/GiftshopView/exclusive2.svg" alt="" id="exclusive-icon">
                <div class="card-details">
                    <h4 id="card-title">{{ product.name }}</h4>
                    <h3>{{ (product.price * (1 - (product.discount / 100))).toFixed(2)}} €</h3>
                </div>
                <div class="card-add-product">
                    <button id="card-btn">
                        <RouterLink id="card-btn-routerlink" :to="{name: 'gift', params: {id: product.id}}">
                            <button>Detalhes</button>
                            <img src="@/assets/img/arrow.svg" alt="">
                        </RouterLink>
                    </button>
                    <button id="card-cart-icon" @click="addToCart(product)">
                        <img src="@/assets/GiftshopView/cart-icon.svg" alt="Icone de um Carrinho">
                    </button>
                </div>
            </div>
        </section>
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
            userStore: useUserStore()
            }
     },

     methods: {
        addToCart(product) {
            /**
             * Adicionar um produto ao carrinho
             */
            //Verificar se um produto é exclusivo, e se sim, verificar se o utilizador está autenticado
            if (product.exclusive && !this.userStore.isAuthenticated) {
                alert(`Precisa de se autenticar para ter acesso a este produto!`)
                return
            }

            //Adicionar um produto ao carrinho
            let newProduct = {
                units: 1,
                product: this.productStore.products.find(giftshopProduct => giftshopProduct.id == product.id),
                date: ''
            }

            if (this.userStore.isAuthenticated) {
                this.userStore.userInfo.userCart.push(newProduct)
            } else {
                this.userStore.cart.push(newProduct)
            }

            alert("Produto adicionado ao carrinho!")            
        }
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
    margin-left: 100px;
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
    border-radius: 100px;
}

#card-cart-icon img{
    margin: 0 7px;
}

#card-cart-icon:hover{
    background-color: #B72636;
}

</style>