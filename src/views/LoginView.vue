<template>
    <div>
        <h1>Login Page</h1>

        <form @submit.prevent="login">
            <input type="email" name="email" id="email" placeholder="Insira o seu email!" v-model="email">
            <input type="password" name="pass" id="p    ass" placeholder="Insira a sua password!" v-model="password">
            <input type="submit" value="Login" @click="login">
        </form>

        <!--Para mais tarde! :)-->
        <p v-if="error" style="color: red;">Informação inválida!</p>
        <p v-if="missingData" style="color: red;">Preencha todos os campos!</p>
    </div>
</template>

<script>

import { useAuthenticationStore } from '@/stores/authentication';

export default {
    data() {
        return {
            email: "",
            password: "",
            error: false,
            missingData: false,
            authenticationStore: useAuthenticationStore() //A store de authentication
        }
    },

    methods: {
        login() {
            //Verificar se todos os campos foram preenchidos
            if (this.email == "" || this.password == "") {
                this.missingData = true
            }

            try {
                //Tentar fazer login
                this.authenticationStore.login(this.email, this.password)
                //Se o login foi feito com sucesso, o utilizador é redirecionado para o seu perfil
                this.$router.push({name: "account", params:{userEmail: this.email}})
            } catch (error) {
                //Se um erro foi detetado, uma mensagem vai ser mostrada
                this.error = true
            }
    },
}}
</script>

<style lang="scss" scoped>

</style>