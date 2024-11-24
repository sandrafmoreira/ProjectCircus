<template>
    <div>
        <h1>Sign Up Page</h1>

        <form @submit.prevent="signUp">
            <input type="text" name="firstName" id="firstName" placeholder="Primeiro Nome" v-model="firstName">
            <input type="text" name="lastName" id="lastName" placeholder="Apelido" v-model="lastName">
            <input type="email" name="email" id="email" placeholder="Insira o seu email" v-model="email">
            <input type="password" name="pass" id="pass" placeholder="Insira uma password!"  v-model="password">
        </form>

        <!--Para mais tarde! :)-->
        <p v-if="error"> Informação inválida!</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                error: false
            }
        },

        methods: {
            signUp() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>