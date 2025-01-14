<template>
    
    <div style="margin-top: 30px;"></div>
    <v-card class="w-100">
        <!-- <v-toolbar color="primary" title="User Profile"></v-toolbar> -->

        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical" class="left-tabs">
                <v-tab text="A tua conta" value="1"></v-tab>
                <v-tab text="Histórico de Produtos" value="2"></v-tab>
                <v-tab text="Partilhar Conteúdo" value="3"></v-tab>
                <v-tab text="Editar Conta" value="4"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab" class="windows">
                <v-tabs-window-item value="1">
                    <h2>{{ this.userStore.fullName }}</h2>
                    <p>Aqui podes consultar e editar os dados da tua conta. <br>Rever os bilhetes e produtos adquiridos durante a nossa <br>estadia, assim como os workshops em que te inscreveste.</p>
               
                    <v-card flat>
                        <v-card :class='["card", badge1]' id="badge1" subtitle="Ganha um voucher de 20% para o próximo evento participando em todos os workshops">
                            <p v-if="badge1 == 'obtained'">Obtido!</p>
                            <p v-else>Não obtido ainda!</p>
                        </v-card>
                        <v-card :class='["card", badge2]' subtitle="Obtém o Pacote Familiar e mais 3 bilhetes adicionais para obteres acesso exclusivo aos bastidores!">
                            <p v-if="badge2 == 'obtained'">Obtido!</p>
                            <p v-else>Não obtido ainda!!</p>
                        </v-card>
                        <v-card :class='["card", badge3]' subtitle="Partilha até cinco fotos dos teus momentos durante o circo e ganha um desconto exclusivo no Catálogo">
                            <p v-if="badge3 == 'obtained'">Obtido!</p>
                            <p v-else>Não obtido ainda!</p>
                        </v-card>

                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="2">
                    
                    <h2>Bilhetes adquiridos</h2>
                    <p>Consulta aqui os teus bilhetes adquiridos</p>
                    <v-card flat>
                        <v-card-text>
                            <ul>
                                <li v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id">
                                    
                                    <h3>{{ ticket.title }}</h3>
                                    <p>{{ ticket.description }}</p>
                                    <p>{{ ticket.price }}</p>
                                    <p>{{ ticket.quantity }}</p>
                                </li>
                            </ul>
                        </v-card-text>
                    </v-card>

                    <h2>As minhas encomendas</h2>
                    <p>Consulta aqui o estado das tuas encomendas</p>

                </v-tabs-window-item>

                <v-tabs-window-item value="3">
                    <v-card flat>
                        <h2>Partilhar Conteúdo!!!</h2>
                        <v-card-text><p>Texto</p></v-card-text>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="4">
                    <v-card>
                        <h2>Editar Conta!!!!</h2>
                        <v-card-text>
                            <p style="color: red;">Antes de qualquer alteração, coloque a sua password para confirmar as alterações!</p>
                            <v-form @submit.prevent="editInformation" v-model="form">
                                    <v-text-field v-model="firstName" :rules="[required]" label="Primeiro Nome" variant="underlined"></v-text-field>
                                    <v-text-field v-model="lastName"  :rules="[required]" label="Apelido" variant="underlined"></v-text-field>
                                    <v-text-field v-model="email"  :rules="[required]" label="Email" type="email" variant="underlined"></v-text-field>
                                    <v-text-field v-model="oldPassword" :rules="[required]" label="Old Password" type="password" variant="underlined"></v-text-field>
                                    <v-text-field v-model="newPassword" label="New Password" type="password" variant="underlined"></v-text-field>
                                    <v-btn class="mt-2" type="submit" block>Guardar</v-btn>
                                    <v-btn class="mt-2" type="submit" @click="removeAccount">Remover Conta</v-btn>
                                    <p v-if="error">O email já está a ser utilizado!</p>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </v-card>
    <RouterLink v-if="userStore.userInfo.adminPermission" :to="{name: 'admin'}">Admin</RouterLink>
</template>

<script>
import { useUserStore } from '@/stores/users';
import { useTicketStore } from "@/stores/ticket";

    export default {
        data() {
            return {
                form: false,
                tab: 1,
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                oldPassword: "",
                newPassword: "",
                error: false,
                badge1: 'not-obtained',
                badge2: 'not-obtained',
                badge3: 'not-obtained',
                userStore: useUserStore(),
                ticketStore: useTicketStore(),
            }
        },

        mounted () {
            this.id = this.userStore.userInfo.id;
            this.firstName = this.userStore.userInfo.firstName;
            this.lastName = this.userStore.userInfo.lastName;
            this.email = this.userStore.userInfo.email;

            if (this.userStore.userInfo.badges.includes('badge1')) {
                this.badge1 = 'obtained'
            }
            if (this.userStore.userInfo.badges.includes('badge2')) {
                this.badge2 = 'obtained'
            }
            if (this.userStore.userInfo.badges.includes('badge3')) {
                this.badge3 = 'obtained'
            }
        },

        methods: {
            editInformation() {
                try {
                    //Se o utilizador quer atualizar a password, a nova password é passada como parametro:
                    if (this.newPassword) {
                        this.userStore.editInformation(this.userStore.userInfo.id, this.email, this.firstName, this.lastName, this.newPassword)
                    //Se nao quiser a password antiga é passada como parametro:
                    } else {
                        this.userStore.editInformation(this.userStore.userInfo.id, this.email, this.firstName, this.lastName, this.oldPassword)
                    }
                    //Atualizar a variavel `oldPassword` para que o utilizador volta a inseri-la ao editar as suas informações

                    alert("Alterações feitas!")

                } catch (error) {
                    this.error = true
                }
            },

            removeAccount() {
                this.userStore.logout()
                this.userStore.removeAccount(this.id)
                this.$router.push('/')
            },

            required(v) {
                //codigo do vuetify
                return !!v || 'Campo é obrigatório'
            },
        },
        
    }
</script>

<style lang="scss" scoped>

.w-100 {
    background-color: #F4EDE4;
    border: none !important;
    box-shadow: none !important;
}

h1, h2, h3, p {
    color: #192657;
}

h2 {
    font-size: 40px;
    margin-bottom: 10px;
}

.card{
    width: 300px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.not-obtained{
    background-color: white;
}

.obtained{
    background-color: #FFF9E3;
}

.left-tabs {
    width: 500px;
    height: 500px;
    padding:100px 100px;
    background-image: url("/src/assets/AccountView/bg-tabs.png");
}

.windows {
    margin-left: 50px;

}


</style>