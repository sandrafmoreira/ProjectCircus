<template>
    <section class="form-section">
        <div class="form-content">
            <div  class="form-text">
                <h1 class="section-title">Iniciar Sessão</h1>
                <p class="section-desc">Bem-vindo de volta! Continua a tua jornada mágica connosco!</p>
            </div>
            <v-form  @submit.prevent="login" v-model="form" class="login-up-form">
            <v-text-field id="email" v-model="email" :rules="[required]" label="Email" type="email" variant="underlined"></v-text-field>
            <v-text-field id="password" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"  v-model="password" :rules="[required]" label="Password" :type="visible ? 'text' : 'password'" variant="underlined" @click:append="visible = !visible"></v-text-field>
            <v-btn class="text-none " id="submitBtn" :disabled="!form" color="#E63946" type="submit">Iniciar Sessão
                <v-icon  class="arrowIcon">
                        mdi-arrow-right
                    </v-icon>
            </v-btn>
            <p class="loginRedirect">Ainda não tens uma conta?<RouterLink v-if="!userStore.isAuthenticated" :to="{name: 'signup'}">Criar Conta</RouterLink></p>
            </v-form>
        </div>
    </section>

    <div class="graphic-el-sing-up">
            <img src="/src/assets/loginView/login_graphic_el.svg" alt="">
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
    font-weight: 380;
}
.login-up-form{
    margin-top: 2rem;
}

.v-field__field {
    cursor: text; 
    color: #ffff;
    background-color: antiquewhite !important; 
    border-radius: 50px;
    }

.graphic-el-sing-up {
    position:absolute;
    display: flex;
    justify-content: space-between;
    z-index: -50;
    left: 0;
    right: 0;
    bottom: 0;
} 

.v-btn.v-btn--density-default {
height: calc(var(--v-btn-height) + 1px);
border-radius: 50px;
margin-top: 35px;

}

.v-btn__content, .v-btn__prepend, .v-btn__append {
    font-size: 16px;}
    .v-btn .v-icon {
    --v-icon-size-multiplier: 1;
    margin-left: 10px;
    line-height: 1; 
    border-radius: 50px;
    }

.loginRedirect{
    margin-top: 60px;
    font-weight: 300;
}

.loginRedirect a{
    color: var(--color-blue-text);
    font-weight: 600;
    text-decoration: underline;
}
</style>