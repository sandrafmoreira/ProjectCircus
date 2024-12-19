<template>
    <div>
        <h1>User Account Page 😊</h1>
        <h2>Olá {{ this.userInfo.firstName }} {{ this.userInfo.lastName }} !!</h2>

        <div>
            <button @click="changeTab(1)" >A tua conta</button>
            <button @click="changeTab(2)">Historico de Produtos</button>
            <button @click="changeTab(3)">Partilhar Conteudo</button>
            <button @click="changeTab(4)">Editar Conta</button>
        </div>
    </div>

    <section>
        <div id="tab1" v-if="tabSelected == 1">
            <h2>A tua conta</h2>
        </div>
        <div id="tab2" v-else-if="tabSelected == 2">
            <h2>Historico de Produtos</h2>
        </div>
        <div id="tab3" v-else-if="tabSelected == 3">
            <h2>Partilhar Conteudo</h2>
        </div>
        <div id="tab3" v-else-if="tabSelected == 4">
            <h2>Editar Conta</h2>

            <form @submit.prevent="editInformation">
                <input type="text" name="firstName" id="firstName" v-model="firstName">
                <input type="text" name="lastName" id="lastName" v-model="lastName">
                <input type="text" name="email" id="email" v-model="newEmail">
                <input type="password" name="oldPassword" id="oldPassword" placeholder="Password Antiga" v-model="oldPassword">
                <input type="password" name="newPassword" id="newPassword" placeholder="Password Nova" v-model="newPassword">
                <input type="submit" value="Guardar" @click="editInformation">

                <button id="removeAccount" @click="removeAccount">Remover Conta</button>
                <p>Antes de qualquer alteração, coloque a sua password para confirmar as alterações!</p>
                <p v-if="error" style="color: red;">Preencha todos os campos!</p>
            </form>
        </div>

        <RouterLink v-if="userInfo.adminPermission" :to="{name: 'admin'}">Admin</RouterLink>
    </section>
</template>

<script>
import { useAuthenticationStore } from '@/stores/authentication';

    export default {
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem("userInfo")),
                tabSelected: 1,
                firstName: JSON.parse(localStorage.getItem("userInfo")).firstName,
                lastName: JSON.parse(localStorage.getItem("userInfo")).lastName,
                oldEmail: JSON.parse(localStorage.getItem("userInfo")).email,
                newEmail: JSON.parse(localStorage.getItem("userInfo")).email,
                oldPassword: "",
                newPassword: "",
                authenticationStore: useAuthenticationStore(),
                error: false
            }
        },

        methods: {
            changeTab(number) {
                this.tabSelected = number
            },

            editInformation() {
                //Verificar se todos os campos (exceto a password nova) estejam preenchidos
                if (this.firstName == "" || this.lastName == "" || this.oldEmail == "" || this.oldPassword == "") {
                    this.error = true
                    return
                }

                try {
                    //Se o utilizador quer atualizar a password, a nova password é passada como parametro:
                    if (this.newPassword == "") {
                        this.authenticationStore.editInformation(this.oldEmail, this.newEmail, this.firstName, this.lastName, this.oldPassword)
                    //Se nao quiser a password antiga é passada como parametro:
                    } else {
                        this.authenticationStore.editInformation(this.oldEmail, this.newEmail, this.firstName, this.lastName, this.newPassword)
                    }
                    //Atualizar a variavel `oldPassword` para que o utilizador volta a inseri-la ao editar as suas informações
                    this.oldPassword = ""
                    this.tabSelected = 1
                } catch (error) {
                    this.error = true
                }
            },

            removeAccount() {
                this.authenticationStore.logout()
                this.authenticationStore.removeAccount(this.oldEmail)
                this.$router.push('/')
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>