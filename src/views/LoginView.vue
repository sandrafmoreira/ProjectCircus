<template>
    <h1>Login Page</h1>

    <div>
        <v-form @submit.prevent="login" v-model="form">
            <v-text-field v-model="email" :rules="[required]" label="Email" type="email" variant="underlined"></v-text-field>
            <v-text-field v-model="password" :rules="[required]" label="Password" type="password" variant="underlined"></v-text-field>
            <v-btn :disabled="!form" color="success" type="submit">Autenticar</v-btn>
        </v-form>
    </div>
    <!--Para mais tarde! :)-->
    <p v-if="error" style="color: red;">Informação inválida!</p>
</template>

<script>

import { useUserStore } from '@/stores/users';

export default {
    data() {
        return {
            form: false,
            email: "",
            password: "",
            error: false,
            missingData: false,
            userStore: useUserStore() //A store dos users
        }
    },

    methods: {
        login() {
            //Verificar se todos os campos foram preenchidos
            if (this.email == "" || this.password == "") {
                this.missingData = true
                return
            }

            try {
                //Tentar fazer login
                this.userStore.login(this.email, this.password)
                //Se o login foi feito com sucesso, o utilizador é redirecionado para o seu perfil
                
                this.$router.push({name: 'account', params:{id: this.userStore.userInfo.id}})
            } catch (error) {
                //Se um erro foi detetado, uma mensagem vai ser mostrada
                this.error = true
            }
        },

        required(v) {
             return !!v || 'Campo é obrigatório'
        }
}}
</script>

<style lang="scss" scoped>

</style>