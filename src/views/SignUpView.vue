<template>
    
    <section class="form-section">

        <div class="form-content">

            <div  class="form-text">
                <h1 class="section-title">Criar conta</h1>
                <p class="section-desc">Cria uma conta e garante o teu acesso a produtos exlusivos do catálogo!</p>

            </div>

            <v-form @submit.prevent="signUp" v-model="form" class="sign-up-form">
                <v-text-field v-model="firstName" :rules="[required]" label="Primeiro Nome" variant="underlined"></v-text-field >
                <v-text-field v-model="lastName" :rules="[required]" label="Apelido" variant="underlined"></v-text-field>
                <v-text-field v-model="email" :rules="[required]" label="Email" variant="underlined" type="email"></v-text-field>
                <v-text-field v-model="password" :rules="[required]" label="Password" variant="underlined" type="password"></v-text-field>
                <v-btn :disabled="!form" color="success" type="submit">Criar Conta</v-btn>
            </v-form>

            <p v-if="emailUsed" style="color: red;">O email que inseriu já está a ser utilizado!</p>
            
        </div>

        

        <!-- <div class="graphic-el-sing-up">
            <svg width="329" height="168" viewBox="0 0 329 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M291.064 53.4054C405.635 411.26 235.416 162.14 95.8426 235.847C-144.377 249.766 -149.631 136.24 -135.77 68.7938C-51.4564 68.3509 8.70659 -20.725 57.4457 5.39386C146.489 86.2653 253.135 -65.0642 291.064 53.4054Z" fill="#121B43"/>
            </svg>


        </div> -->

       

    </section>

    <div class="graphic-el-sing-up">
            <img src="/src/assets/SignUpView/Bolas.png" alt="">
            <img src="/src/assets/SignUpView/Palhaco.png" alt="">
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

    .form-section {
    padding-top: 8rem;
    
    
    
    }

    .form-content {

        margin: auto;
        width: 30vw;

    }

    .form-text h1{
        margin-bottom: 0.5rem;
    }

    .form-text p{
        font-size: 1rem;

    }

    .sign-up-form{
        margin-top: 2rem;
    }

    .graphic-el-sing-up {
        position:absolute;
        display: flex;
        justify-content: space-between;
        // margin-top: 200%;
        z-index: -50;
        left: 0;
        right: 0;
        bottom: 0;
        // transform: translateY(-12%);
    }


</style>