<template>
    <div>
        <h1>Giftshop Page 🎁</h1>
        
    </div>
</template>

<script>
import {useProductsStore} from '@/stores/products';
    export default {
     data() {
        return {
            productsStore: useProductsStore(),
             }
     },
        
    }
</script>

<style lang="scss" scoped>

</style>