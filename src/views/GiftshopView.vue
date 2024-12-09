<template>
    <div>
        <h1>Giftshop Page 🎁</h1>
        
    </div>
</template>

<script>
    export default {
     data() {
        return {
             gifts: [
                {
                    name: "",
                    description: '',
                    price: 0,
                    image: '',
                    restricted: false, //despunivel apenas para utilizadores
                }]}
     },
        
    }
</script>

<style lang="scss" scoped>

</style>