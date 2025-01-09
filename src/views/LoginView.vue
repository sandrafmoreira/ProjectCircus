<template>
    <div>
        <v-form @submit.prevent="login" v-model="form">
            <h1>Iniciar Sessão</h1>
            <p>Bem-vindo de volta! Continua a tua jornada mágica connosco!</p>
            <v-text-field class="form-input" id="email" v-model="email" :rules="[required]" label="Email" type="email" variant="plain"></v-text-field>
            <v-text-field class="form-input" id="password" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"  v-model="password" :rules="[required]" label="Password" :type="visible ? 'text' : 'password'" variant="plain" @click:append="visible = !visible"></v-text-field>
            <v-btn class="text-none" id="submitBtn" :disabled="!form" color="#E63946" type="submit">Iniciar Sessão
                <img id="arrowIcon" src="@/assets/img/arrow.png" alt="Ícone de seta"/>
            </v-btn>
            <p id="loginRedirect">Ainda não tens uma conta?<RouterLink v-if="!userStore.isAuthenticated" :to="{name: 'signup'}">Criar Conta</RouterLink></p>
        </v-form>
        
    </div>
</template>

<script>

import { useUserStore } from '@/stores/users';

export default {
    data() {
        return {
            form: false,
            visible: false,
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

form{
    margin: 80px auto;
    width: 500px;
}

form p{
    margin: 10px 0;
    font-weight: 400;
}

.v-text-field{
    margin-top: 15px;
}

#submitBtn{
    display: block;
    float: left;
    height: 45px;
    width: 180px;
    border-radius: 20px;
    margin-top: 15px;
}

#arrowIcon{
    position: relative;
    width: 30px; 
    height: 20px; 
    margin-left: 8px;
}

#loginRedirect{
    margin-top: 80px;
}

#loginRedirect a{
    color: #192657;
    font-weight: 400;
    text-decoration: underline;
}
</style>