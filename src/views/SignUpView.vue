<template>
    <h1>Sign Up Page</h1>

    <div>
        <v-form @submit.prevent="signUp" v-model="form">
            <v-text-field v-model="firstName" :rules="[required]" label="Primeiro Nome" variant="underlined"></v-text-field>
            <v-text-field v-model="lastName" :rules="[required]" label="Apelido" variant="underlined"></v-text-field>
            <v-text-field v-model="email" :rules="[required]" label="Email" variant="underlined" type="email"></v-text-field>
            <v-text-field v-model="password" :rules="[required]" label="Password" variant="underlined" type="password"></v-text-field>
            <v-btn :disabled="!form" color="success" type="submit">Criar Conta</v-btn>
        </v-form>

        <!--Para mais tarde! :)-->
        <p v-if="emailUsed" style="color: red;">O email que inseriu já está a ser utilizado!</p>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/users';

export default {
    data() {
        return {
            form: false,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            emailUsed: false,
            userStore: useUserStore(),

        }
    },

    methods: {
        signUp() {
            try {
                //Tentar criar uma conta
                this.userStore.signUp(this.email, this.firstName, this.lastName, this.password)
                //Se a conta foi criada com sucesso, o utilizador é redirecionado para a página de login
                this.$router.push("/login")
            } catch (error) {
                //Se um erro foi detetado, uma mensagem vai ser mostrada
                this.emailUsed = true
            }
        },

        required(v) {
             return !!v || 'Campo é obrigatório'
        }
    },
}
</script>

<style lang="scss" scoped>

</style>