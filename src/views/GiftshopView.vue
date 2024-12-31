<template>
    <div>
        <h1>Giftshop Page 🎁</h1>
        
        <v-container class="bg-surface-variant" id="catalog">
            <v-row no-gutters v-for="product in productStore.products">
                <v-col cols="4">
                    <img :src="product.image" alt="">
                    <h4>{{ product.name }}</h4>
                    <p>{{ product.description }}</p>
                    <h3>{{ product.price * (1 - (product.discount / 100)) }} €</h3>
                    <h2 v-if="product.exclusive">EXCLUSIVO!</h2>
                    <RouterLink :to="{name: 'gift', params: {id: product.id}}"><v-btn>+</v-btn></RouterLink>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>


import { useProductStore } from '@/stores/products';
    export default {
     data() {
        return {
            productStore: useProductStore(),
             }
     },
        
    }
</script>

<style lang="scss" scoped>

#catalog{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>