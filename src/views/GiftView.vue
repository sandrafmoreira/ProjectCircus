<template>
    <div>
        <button
        >Add to cart</button>
        <RouterLink to="'../views/GiftshopView.vue'" >Voltar</RouterLink>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "GiftItem",
                props: {
                    gift: {
                    type: Object,
                    required: true,}
              
                },
            }
        },

        methods: {
            addGift() {
                // check if is restrict //else add
                //check if is logged
                //then add
                // else alert: faça login para adicionar este produto a carrinho
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>