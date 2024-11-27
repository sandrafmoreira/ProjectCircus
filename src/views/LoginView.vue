<template>
    <div>
        <h1>Login Page</h1>

        <form @submit.prevent="login">
            <input type="email" name="email" id="email" placeholder="Insira o seu email!" v-model="email">
            <input type="password" name="pass" id="pass" placeholder="Insira a sua password!" v-model="password">
            <button id="submitBtn">Submeter!</button>
        </form>

        <!--Para mais tarde! :)-->
        <p v-if="error" style="color: red;">Informação inválida!</p>
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
            authenticationStore: useAuthenticationStore() //A store de authentication
        }
    },

    methods: {
        login() {
            if (this.email == "ken@123" && this.password == "123"
            || this.email == "nuno@456" && this.password == "456" 
            || this.email == "sandra@789" && this.password == "789"
            ) {
                let userInformation = {
                    email: this.email,
                    pass: this.password,
                }

                this.authenticationStore.login(userInformation) //Chamar a função login na store da authentication
                
                this.$router.push({ name: "account", params:{userEmail: userInformation.email}}) //Ir para a página de perfil

                alert("Login feito!")
                
            } else {
                this.error = true //Mostrar a mensagem de erro
            }
    },
}}
</script>

<style lang="scss" scoped>

</style>