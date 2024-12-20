<template>
    <div>
        <h1>Giftshop Page 🎁</h1>
        
    </div>
</template>

<script>
import {useProductStore} from '@/stores/products';
    export default {
     data() {
        return {
            productsStore: useProductStore(),
             }
     },
        
    }
</script>

<style lang="scss" scoped>

</style>