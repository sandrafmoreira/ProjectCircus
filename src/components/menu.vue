<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom" min-width="536">
        <template v-slot:activator="{ props }">
            <button class="menu-button" v-bind="props">
                <img class="menu-icon" src="../assets/nav_img/menu-icon.svg" alt="Icone do menu">
            </button>
        </template>

        <!--Menus-->
        <v-card color="#121B43" class="menu">
            <div class="menu-section">
                <RouterLink class="menu-links" :to="{name: 'about'}">Illusionni</RouterLink> 
                <RouterLink class="menu-links" :to="{name: 'activities'}">Atividades</RouterLink>
            </div>
            <div class="menu-section">
                <RouterLink class="menu-links" :to="{name: 'giftshop'}">Giftshop</RouterLink>
                <RouterLink class="menu-links" :to="{name: 'news'}">Destaques</RouterLink>
            </div>
            <div class="menu-section">
                <RouterLink class="menu-links" :to="{name: 'pricing'}">Programa</RouterLink>
                <RouterLink class="menu-links" :to="{name: 'gallery'}">Galeria</RouterLink>
            </div>
            <div v-if="!userStore.isAuthenticated" class="not-authenticated">
                <div>
                    <h4>Inicia Sessão ou cria uma conta</h4>
                </div>
                <div>
                    <RouterLink class="menu-links login" v-if="!userStore.isAuthenticated" :to="{name: 'login'}">Iniciar Sessão</RouterLink>
                    <RouterLink class="menu-links sign-up" v-if="!userStore.isAuthenticated" :to="{name: 'signup'}">Criar Conta</RouterLink>
                </div>
            </div>
            <div v-else class="authenticated">
                <RouterLink class="menu-links account" v-if="userStore.isAuthenticated" :to="{name: 'account', params: {id: userStore.userInfo.id}}">A minha conta</RouterLink>
                <button class="logout" v-if="userStore.isAuthenticated" @click="logout">Sair</button>
            </div>
            <img class="balloon-icon" src="../assets/nav_img/balloons.svg" alt="">
        </v-card>
    </v-menu>
</template>

<script>
    import { useUserStore } from '@/stores/users';
    import { RouterLink } from 'vue-router';

    export default {
        data() {
            return {
                userStore: useUserStore(),
                //Mostrar ou não o Menu
                menu: false
            }
        },

        components: {
            RouterLink,
        },

        methods: {
            logout() {
            this.userStore.logout() //Chamar a função logout na store da authentication

            this.$router.push({ name: "home" }); //Voltar para a homepage
            }
        },
    }
</script>

<style lang="scss" scoped>

.menu{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
    width: 400px;
    height: 400px;
}

.menu-section{
    display: flex;
    justify-content: center;
    gap: 100px;
    margin-top: 50px;
}

.menu-links{
    text-decoration: none; 
    color: white
}

.not-authenticated{
    text-align: center;
}

.not-authenticated div:nth-of-type(2){
    display: flex;
    justify-content: center;
    gap: 70px;
    margin-top: 25px;
}

.authenticated{
    display: flex;
    justify-content: center;
    gap: 70px;
    margin-top: 25px;
}

.login, .sign-up, .account, .logout{
    padding: 8px 15px;
    border-radius: 25px;
    border: 1px solid #E63946;
}

.logout{
    width: 100px;
}

.login, .account{
    background-color: #E63946;
}

.login:hover, .account:hover{
    background-color: #121B43;
    border: 1px solid #E63946;
}

.sign-up:hover, .logout:hover{
    background-color: #E63946;
    border: 1px solid #121B43;
}

.balloon-icon{
    margin-left: 240px;
}
</style>