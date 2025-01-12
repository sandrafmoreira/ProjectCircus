<template>

<section class="form-section">
        <div class="form-content">
            <div  class="form-text">
                <h1 class="section-title">Criar conta</h1>
                <p class="section-desc">Cria uma conta e garante o teu acesso a produtos exlusivos do catálogo!</p>
            </div>

            <v-form @submit.prevent="signUp" v-model="form" class="sign-up-form">
                <v-text-field v-model="firstName" :rules="[required]" label="Nome" variant="underlined"></v-text-field >
                <v-text-field v-model="lastName" :rules="[required]" label="Apelido" variant="underlined"></v-text-field>
                <v-text-field v-model="email" :rules="[required]" label="Email" variant="underlined" type="email"></v-text-field>
                <v-text-field v-model="password" :rules="[required]" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" label="Password" :type="visible ? 'test' : 'password'" variant="underlined" type="password" @click:append="visible = !visible"></v-text-field>
                <div class="checkbox-content">
                <label for="terms" class="checkbox">Eu li e concordo com os termos de uso</label><input type="checkbox" name="terms" class="terms"><br>
                <label for="newsletter" class="checkbox">Subscrever a Newsletter</label><input type="checkbox" name="newsletter" class="newsletter">
        
            </div>
                <v-btn class="text-none " id="submitBtn" :disabled="!form" color="#E63946" type="submit">Criar Conta
                    
                    <v-icon  class="arrowIcon">
                        mdi-arrow-right
                    </v-icon>
                </v-btn>
            </v-form>
            <p v-if="emailUsed" style="color: red;">O email que inseriu já está a ser utilizado!</p>
            
           
        </div>
       
    </section>
    <div class="graphic-el-sing-up">
            <img src="/src/assets/SignUpView/signUp_graphic_el.svg" alt="">
    
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
    .sign-up-form{
        margin-top: 2rem;
      
    }

    .checkbox{
        line-height:1.3;
        font-family: var(--font-Lexend);
        font-weight: 00;
        font-size: 14px;
        color: var( --color-blue-text);
    }

    .terms, .newsletter{
    margin-left: 10px;
    
    }

    .terms{
        margin-top: 30px;
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

