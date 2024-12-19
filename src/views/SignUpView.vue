<template>
    <div>
        <h1>Sign Up Page</h1>

        <form @submit.prevent="signUp">
            <input type="text" name="firstName" id="firstName" placeholder="Primeiro Nome" v-model="firstName">
            <input type="text" name="lastName" id="lastName" placeholder="Apelido" v-model="lastName">
            <input type="email" name="email" id="email" placeholder="Insira o seu email" v-model="email">
            <input type="password" name="pass" id="pass" placeholder="Insira uma password!"  v-model="password">
            <input type="submit" value="Criar Conta" @click="signUp">
        </form>

        <!--Para mais tarde! :)-->
        <p v-if="missingData" style="color: red;">Preencha todos os campos!</p>
        <p v-if="emailUsed" style="color: red;">O email que inseriu já está a ser utilizado!</p>
    </div>
</template>

<script>
import { useAuthenticationStore } from '@/stores/authentication';

export default {
    data() {
        return {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            missingData: false,
            emailUsed: false,
            authenticationStore: useAuthenticationStore(),
        }
    },

    methods: {
        signUp() {
            //Verificar se todos os campos foram preenchidos
            if (this.email == "" || this.firstName == "" || this.lastName == "" || this.password == "") {
                this.missingData = true
            } 

            try {
                //Tentar criar uma conta
                this.authenticationStore.signUp(this.email, this.firstName, this.lastName, this.password)
                //Se a conta foi criada com sucesso, o utilizador é redirecionado para a página de login
                this.$router.push("/login")
            } catch (error) {
                //Se um erro foi detetado, uma mensagem vai ser mostrada
                this.emailUsed = true
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>