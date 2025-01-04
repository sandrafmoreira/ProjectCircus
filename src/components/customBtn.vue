<template  v-slot:activator="{ props }">
     <v-btn
     v-bind="props"
     :color="color" 
     :class="customClass"
     @click="handleClick" 
     variant="flat" 
     rounded="xl" 
     size="default" 
     block>
     <slot>button</slot></v-btn>
</template>

<script>
    export default {
        name: 'customBtn',
        props:{
            color:{
                type:String,
                default:'default'
            },
            size:{
                type:String,
                default:'default'
            },

            customClass:{
                type:String,
                default:'default-red-btn  '
            }, 
        },

        methods:{
            onClick(event){
                this.$emit('click',event)
            },

        }
    }
</script>

<style lang="scss" scoped>
  
    .default-red-btn {
    font-family: var(--font-Lexend);
    text-transform:capitalize;
    min-width: 15% !important;
    background-color:var(--color-red-btn) !important; /* Vermelho personalizado */
    color: white !important;
    }

    .default-red-btn:hover{
        background-color:var(--color-red-btn-hover) !important
    }

</style>