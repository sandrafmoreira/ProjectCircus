<template>
    <div>
        <v-form @submit.prevent="signUp" v-model="form">
            <h1>Criar Conta</h1>
            <p>Cria uma conta e garante o teu acesso a produtos exlusivos do catálogo!</p>
            <div class="usernameInputs">
                <v-text-field class="form-input" v-model="firstName" :rules="[required]" label="Primeiro Nome" variant="plain"></v-text-field>
                <v-text-field class="form-input" v-model="lastName" :rules="[required]" label="Apelido" variant="plain"></v-text-field>
            </div>
            <v-text-field class="form-input" v-model="email" :rules="[required]" label="Email" variant="plain" type="email"></v-text-field>
            <v-text-field class="form-input" v-model="password" :rules="[required]" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" label="Password" :type="visible ? 'test' : 'password'" variant="plain" type="password" @click:append="visible = !visible"></v-text-field>
            <label for="terms">Eu li e concordo com os termos de uso</label><input type="checkbox" name="terms" id="terms"><br>
            <label for="newsletter">Subscrever a Newsletter</label><input type="checkbox" name="newsletter" id="newsletter">

            <v-btn class="text-none" id="submitBtn" :disabled="!form" color="#E63946" type="submit">Registar
                <img id="arrowIcon" src="@/assets/img/arrow.png" alt="Ícone de seta"/>
            </v-btn>
        </v-form>
    </div>
    <img id="image1" src="@/assets/img/malabarismo_signup.png" alt="">
    <img id="image2" src="@/assets/img/forma1_signup.png" alt="">
    <img id="image3" src="@/assets/img/forma2_signup.png" alt="">
    <img id="image4" src="@/assets/img/clown_signup.png" alt="">
</template>

<script>
import { useUserStore } from '@/stores/users';

export default {
    data() {
        return {
            form: false,
            visible: false,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
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

img{
    position: absolute;
}

form{
    margin: 80px auto;
    width: 500px;
}

form p{
    margin: 10px 0;
    font-weight: 400;
}

.usernameInputs{
    display: flex;
    gap: 15px;
}

.v-text-field{
    margin-top: 15px;
}

#submitBtn{
    display: block;
    float: right;
    height: 45px;
    width: 135px;
    border-radius: 20px;
    margin-top: 50px;
}

#submitBtn:hover{
    background-color: #B72636;
}

#arrowIcon{
    position: relative;
    width: 30px; 
    height: 20px; 
    margin-left: 8px;
}

#terms, #newsletter{
    appearance: none; /*Faz com que o estilo padrao de uma checkbox desapareça*/
    width: 15px;
    height: 15px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #F1DEC5;
    transition: background-color 0.3s ease;
    margin-left: 10px;
    margin-top: 15px;
}

#terms:checked, #newsletter:checked{
    background-color: #007bff; /* Cor de fundo marcada */
}

#image1{
    top: 35%;
}
</style>