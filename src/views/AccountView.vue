<template>
    
    <div style="margin-top: 30px;"></div>
    <v-card class="w-100">
        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical" class="left-tabs">
                <v-tab text="A tua conta" value="1" color="white"></v-tab>
                <v-tab text="Histórico de Produtos" value="2" color="white"></v-tab>
                <v-tab text="Partilhar Conteúdo" value="3" color="white"></v-tab>
                <v-tab text="Editar Conta" value="4" color="white"></v-tab>
                <v-tab v-if="userStore.userInfo.adminPermission" text="Administradores" value="5"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab" class="windows">
                <v-tabs-window-item value="1">
                    <h2>Olá {{ this.userStore.fullName }}!</h2>
                    <p>Aqui podes consultar e editar os dados da tua conta. <br>Rever os bilhetes e produtos adquiridos durante a nossa <br>estadia, assim como os workshops em que te inscreveste.</p>
                    <br><br>
                    <v-card class="badges-section" flat>
                        <div>
                            <img v-if="!badge1.obtained" src="@/assets/AccountView/badge1-not-obtained.svg" alt="Medalha nº1 não obtida">
                            <img v-else src="@/assets/AccountView/badge1-obtained.svg" alt="Medalha nº1 obtida">
                            <div class="badge-usage" v-if="badge1.obtained">
                                <p v-if="badge1.used" id="badge-used">Já utilizaste este código!</p>
                                <p v-else id="badge-not-used">Código: <b>"fa_de_workshops"</b></p>
                            </div>
                        </div>

                        <div>
                            <img v-if="!badge2.obtained" src="@/assets/AccountView/badge2-not-obtained.svg" alt="Medalha nº2 não obtida">
                            <img v-else src="@/assets/AccountView/badge2-obtained.svg" alt="Medalha nº2 obtida">
                        </div>

                        <div>
                            <img v-if="!badge3.obtained" src="@/assets/AccountView/badge3-not-obtained.svg" alt="Medalha nº3 não obtida">
                            <img v-else src="@/assets/AccountView/badge3-obtained.svg" alt="Medalha nº3 obtida">
                            <div class="badge-usage"  v-if="badge3.obtained">
                                <p v-if="badge3.used" id="badge-used">Já utilizaste este código!</p>
                                <p v-else id="badge-not-used">Código: <b>"#vida_social"</b></p>
                            </div>
                        </div>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="2">
                    
                    <h2>Bilhetes adquiridos</h2>
                    <p>Consulta aqui os teus bilhetes adquiridos.</p>

                    <div class="notification" v-if="userStore.userInfo.badges.length != 0">
                        <img src="/src/assets/AccountView/notification1_icon1.svg" alt="">
                        <p><b>Ganhaste um prémio!</b> Verifica o teu email para mais detalhes!</p>
                        <img src="/src/assets/AccountView/notification1_icon2.svg" alt="">
                    </div>
                    <v-divider></v-divider>
                    <v-slide-group v-model="ticketSlide"
                        class="pa-4" selected-class="bg-success"
                        show-arrows center-active="true"
                        style="height: 250px; width: 900px;"
                        v-if="ticketStore.purchasedTickets">
                        <div class="card-ticket" v-for="ticket in ticketStore.purchasedTickets" :key="ticket.id">
                                <v-slide-group-item class='bg-card'>
                                    <img src="/src/assets/AccountView/Bilhete.png" class="img-ticket-bg" alt="Background da card">
                                    <div class="card-info">
                                        <div style="margin-top: 10px; margin-left: 10px; width: 300px;">
                                            <h3 style="margin-left: 5px;">{{ ticket.title }}</h3>
                                            <div style="display: flex; justify-content: space-between;">
                                                <p style="width:80px; margin-left: 5px;">Zona {{ ticket.zone }}</p>
                                                <p style="font-size: 28px; margin-right: 15px;">{{ ticket.price }}€</p>
                                            </div>
                                            <p style="margin-left: 5px; margin-top: 20px;">{{ ticket.description }}</p>
                                        </div>
                                        <div style="margin-left: 10px; margin-top: 15px;">    
                                            <p style="font-size: 25px;">{{ ticket.selectedDate }}</p>
                                            <p>Parque da Cidade, Porto</p>
                                            <p>{{ ticket.quantity }}x {{ ticket.title }}</p>
                                        </div>
                                    </div>
                                </v-slide-group-item>
                            </div>
                    </v-slide-group>

                    <v-divider></v-divider>
                    
                    <div class="notification" v-if="ticketStore.purchasedTickets.length > 0">
                        <img src="/src/assets/AccountView/notification2_icon1.svg" alt="">
                        <p><b>Parabéns pelos teus primeiros bilhetes!</b> Ficamos à tua espera!</p>
                        <img src="/src/assets/AccountView/notification2_icon2.svg" alt="">
                    </div>

                    <v-divider></v-divider>

                    <v-slide-group v-model="workshopSlide"
                    class="pa-4" selected-class="bg-success"
                    show-arrows center-active='true'
                    style="height: 300px; width: 900px;"
                    v-if="ticketStore.purchasedWorkshops">
                        <div class="card-ticket" v-for="workshop in ticketStore.purchasedWorkshops">
                            <v-slide-group-item class="bg-card">
                                <img src="/src/assets/AccountView/Bilhete.png" class="img-ticket-bg" alt="Background da card">
                                <div class="card-info">
                                    <div style="margin-top: 10px; margin-left: 10px; width: 300px; padding-right: 10px;">
                                        <h3 style="margin-left: 5px;">{{ workshop.title }}</h3>
                                        <div style="display: flex; justify-content: space-between;">
                                            <p style="font-size: 28px; margin-left: 180px; margin-top: 10px;">{{ workshop.price }}€</p>
                                        </div>
                                        <p style="margin-left: 5px; margin-top: 10px;"> {{ workshop.description }}</p>
                                    </div>
                                    <div style="margin-left: 15px; margin-top: 15px;">
                                        <p style="font-size: 25px;">{{ workshop.selectedDate }}</p>
                                        <p>Parque da Cidade, Porto</p>
                                        <p>{{ workshop.quantity }}x {{ workshop.title }}</p>
                                    </div>
                                </div>
                            </v-slide-group-item>
                        </div>
                    </v-slide-group>

                    <h2>As minhas encomendas</h2>
                    <p>Consulta aqui o estado das tuas encomendas</p>
                    <section class="products-history">
                        <v-card class="product-card" v-for="(product, index) in userStore.userInfo.products">
                            <div class="product-card-image">
                                <img src="/src/assets/AccountView/product-history-background.svg" alt="Background da Card do Produto">
                                <img :src="product.product.image" alt="">
                            </div>
                            <div class="product-card-details">
                                <div class="product-card-details-order">
                                    <h3>Encomenda nº{{ index + 1}}</h3>
                                    <h3>A ser enviada</h3>
                                </div>
                                <h3 class="product-card-details-quantity">{{ product.units }}x {{ product.product.name }}</h3>
                                <div class="product-card-details-price">
                                    <h3>{{ (product.product.price * product.units).toFixed(2) }}€</h3>
                                    <p>Pedido Efetuado a {{ product.date }}</p>
                                </div>
                            </div>
                        </v-card>
                    </section>
                </v-tabs-window-item>

                <v-tabs-window-item value="3"class="shareContent-tab">
                    <v-card flat class="share-section-container">

                        <h2>Partilha aqui os teus momentos </h2>
                        <p>Ao partilhares as tuas imagens, autorizas-nos a utilizá-las na nossa galeria e nas nossas redes sociais.</p>
                        <v-form ref="form" v-model="valid">
                            <!-- Campo de Upload -->
                            <v-file-input
                            label="Partilhar Foto"
                            show-size
                            truncate-length="15"
                            accept="image/*"
                            v-model="postImageSrc"
                            ></v-file-input>

                            <!-- Campo de Legenda -->
                            <v-text-field
                            label="Legenda (Limite de 30 caracteres)"
                            v-model="postCaption"
                            maxlength="30"
                            ></v-text-field>

                            <v-btn id="post-picture-btn" :disabled="!postImageSrc" @click="addPost" color="#E63946">Adicionar Foto</v-btn>
                        </v-form>
                    </v-card>

                    <!-- Galeria de Fotos -->
                    <v-slide-group
                        v-model="model"
                        class="pa-4"
                        selected-class="bg-success"
                        show-arrows
                        center-active="true"
                        v-if="photos.length">
                        <v-slide-group-item v-for="(post, index) in userStore.userInfo.posts" :key="index">
                            <RouterLink :to="{name: 'gallery'}">
                            <v-card width="200px"  variant:="plain" class="share-gallery-card" flat="true" @click="" >
                           
                                <v-img :src="post.image" ></v-img>
                                <div class="share-gallery-card-actions">
                                    <v-card-text>
                                        <p>{{ post.caption }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="red" @click="this.userStore.removePost(false, post.id)" icon>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                                
                            </v-card>
                            </RouterLink>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-tabs-window-item>

                <v-tabs-window-item value="4" class="editAccount-tab">
                    <v-card :flat="true">
                        <h2 class="section-title">Editar Conta</h2>
                        <v-card-text>
                            <v-form @submit.prevent="editInformation" v-model="form" >
                                    <v-text-field v-model="firstName" :rules="[required]"
                                    variant="filled"></v-text-field>
                                    <v-text-field  v-model="lastName"  :rules="[required]"  variant="filled"></v-text-field>
                                    <v-text-field v-model="email"  :rules="[required]"  type="email" variant="filled"></v-text-field>
                                    <v-text-field v-model="oldPassword" :rules="[required]" label="Old Password" type="password" variant="filled"></v-text-field>
                                    <v-text-field v-model="newPassword" label="New Password" type="password" variant="filled"></v-text-field>
                                    <div class="editAccount-tab-btns">
                                        <v-btn class="mt-2" type="submit" block>Guardar</v-btn>
                                        <v-btn class="mt-2" type="submit" @click="removeAccount">Remover Conta</v-btn>
                                    </div>
                                   
                                    <p v-if="error">O email já está a ser utilizado!</p>
                            </v-form>
                        </v-card-text>
                        

                        <!-- Alerta personalizado de Eliminar Conta -->
                        <div v-if="alertVisible" class="personalizedAlert">
                            <div class="cont-personalizedAlert">
                                <img src="@/assets/alerts/eliminar conta.png" alt="" class="img-personalizedAlert" />
                                <div class="btns-alert">
                                    <button @click="closePersonalizedAlert" class="btn-cancelar">Cancelar</button>
                                    <button @click="removeAccount" class="btn-eliminar">Eliminar</button>
                                </div>
                               
                            </div>
                        </div>
                        <!-- Alerta personalizado de sucesso  -->
                        <div v-if="successVisible" class="success-alert">
                            <div class="cont-success-alert">
                                <img src="@/assets/alerts/Notificação Sucesso.png" alt="" class="img-success-alert" />
                                <button @click="closeSuccessAlert" class="btn-success">X</button>
                            </div>
                        </div>

                    </v-card>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </v-card>
</template>

<script>
import { useUserStore } from '@/stores/users';
import { useTicketStore } from "@/stores/ticket";

    export default {
        data() {
            return {
                ticketSlide: 0,
                workshopSlide: 0,
                form: false,
                tab: 1,
                id: 0,
                //Editar informações do utilizador
                firstName: '',
                lastName: '',
                email: '',
                oldPassword: "",
                newPassword: "",
                error: false,
                //Medalhas do utilizador
                badge1: {obtained: false, used: false},
                badge2: {obtained: false, used: false},
                badge3: {obtained: false, used: false},
                //Publicações do utilizador
                postCaption: '',
                postImageSrc: '',
                userStore: useUserStore(),
                ticketStore: useTicketStore(),
                photos: [
                { url: '/src/assets/AccountView/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 1' },
                { url: '/src/assets/AccountView/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 2' },
                { url: '/src/assets/AccountView/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 3' },
                { url:'/src/assets/AccountView/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 4' }
                ],
                alertVisible: false, // verifica se o alerta personalizado esta apresentado
                successVisible: false, // verifica se o alerta personalizado esta apresentado

            }
        },

        mounted () {
            this.id = this.userStore.userInfo.id;
            this.firstName = this.userStore.userInfo.firstName;
            this.lastName = this.userStore.userInfo.lastName;
            this.email = this.userStore.userInfo.email;
            this.userStore.verifyBadges()

            //Verificar as medalhas que o utilizador já obteu
            this.userStore.userInfo.badges.forEach(badge => {
                if (badge.id == 1) {
                    this.badge1.obtained = true
                    if(badge.used) {
                        this.badge1.used = true
                    }
                } else if (badge.id == 2) {
                    this.badge2.obtained = true
                } else if (badge.id == 3) {
                    this.badge3.obtained = true
                    if(badge.used) {
                        this.badge3.used = true
                    }
                }
            });
        },

        watch: {
            tab(newValue) {
                if (newValue == 5) {
                    this.$router.push({name: 'admin'})
                }
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

                    this.successVisible = true;

                } catch (error) {
                    this.error = true
                }
            },

            removeAccount() {
                this.userStore.removeAccount(this.id)
                this.userStore.logout()
                this.$router.push('/')
            },

            required(v) {
                //codigo do vuetify
                return !!v || 'Campo é obrigatório'
            },


            addPost() {
                const reader = new FileReader();

                // Quando o arquivo for lido, atualiza a variável postImageSrc com o conteúdo da imagem
                reader.onload = (e) => {
                    this.postImageSrc = e.target.result;  // Agora postImageSrc contém a URL de dados base64 da imagem
                    console.log('Imagem lida:', this.postImageSrc);  // Verifica se a imagem foi lida corretamente
                    
                    // Adiciona a publicação
                    this.userStore.addNewPost(this.userStore.fullName, this.postImageSrc, this.postCaption);
                    
                    // Limpar os campos após adicionar
                    this.postImageSrc = '';  // Limpa a imagem
                    this.postCaption = '';   // Limpa a legenda
                };

                reader.readAsDataURL(this.postImageSrc);
            },
            showPersonalizedAlert() {
                this.alertVisible = true;
            },
            closePersonalizedAlert() {
                this.alertVisible = false;
            },
            closeSuccessAlert() {
                this.successVisible = false;
            }

        
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

.left-tabs {
    width: 500px;
    height: 500px;
    padding:100px 100px;
    background-image: url("/src/assets/AccountView/bg-tabs.png");
    color: #f7f1f1;
}

.windows {
    margin-left: 80px;
    width: 100%;

}

//badges tab
.badges-section{
    display: flex;
    justify-content: start;
}

.badge-usage p{
    text-align: center;
}

// share content tab
.shareContent-tab{
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.share-gallery-card{
    margin-left: 0.5rem;
}
.v-img{
    border-radius: 0% 0% 57% 0% / 0% 47% 30% 0% ;
}
.v-card-text{
    padding-bottom: 0;
}

#post-picture-btn{
    border-radius: 50px;
}

// edit account

.v-card{
    background-color: transparentize($color: #f7f1f1, $amount: 1);
}

.editAccount-tab{
    width: 70%;
}

.editAccount-tab-btns{
    display: grid;
    grid-template-columns: 40% 40%;
    justify-content: space-between;
    gap: 2%;
}
.editAccount-tab .v-btn:first-child{
    color: #fff;
    border-radius: 50px;
    min-width: 0;
    background-color: var(--color-red-btn);
}

.editAccount-tab .v-btn:hover{
    color: #fff;
    background-color: var(--color-red-btn-hover);
}
.editAccount-tab .v-btn:last-child{
    border: 2px solid var(--color-red-btn);
    color:var(--color-red-btn);
    border-radius: 50px;
    min-width: 0;
    background-color: transparentize($color: #000000, $amount: 1);
}
.products-history{
    padding: 0;
}

.product-card{
    display: flex;
    margin: 40px 0;
    width: 700px;
    height: 180px;
    border: 1px solid #F1DEC5;
}

.product-card-image{
    margin-right: 60px;
}

.product-card-image img:nth-of-type(1) {
    position: absolute;
    z-index: -1;
    height: 180px;
}

.product-card-image img:nth-of-type(2) {
    margin-left: 20px;
    margin-top: 10px;
    width: 150px;
}

.product-card-details{
    width: 450px;
}

.product-card-details-order{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.product-card-details-order h3:nth-of-type(2) {
    background-color: white;
    border-radius: 30px;
    padding: 5px 20px;
}

.product-card-details-quantity{
    margin-top: 15px;
}

.product-card-details-price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
}

// purchased tickets


.card-ticket {
    width: 400px;
    height:100%;
    margin-right: 150px;
}


.img-ticket-bg {
    position:absolute;
    z-index: -1;
    width:500px;
    height: 200px;
}

.bg-card div {
    padding:20px 20px 20px 10px;
}

.card-info{
    display: flex;
}

.notification{
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 0;
}



/* Personalized Alert */


.personalizedAlert {
  position: fixed;
  top: 25vh;
  left: 35vw;
  z-index: 100;
}


.cont-personalizedAlert {
  position: relative;
}


.img-personalizedAlert {
  width: 30vw;
}


.btns-alert {
    position: absolute;
    bottom: 50px;
    left: 50%;  
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}


.btn-cancelar {
  top: 10px;
  right: 10px;
  background-color:white;
  color:  #B72636;
  padding: 15px 15px;
  border-radius: 100px;
}
.btn-eliminar {
  top: 10px;
  right: 10px;
  background-color: #B72636;
  color: white;
  padding: 15px 15px;
  border-radius: 100px;
}


.success-alert {
  position: fixed;
  top: 20vh;
  right: 4vh;
  z-index: 100;
}


.cont-success-alert {
  position: relative;
}


.img-success-alert {
  width: 30vw;
}


.btn-success {
    background-color: #E63946;
    color: white;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 100px;
    padding: 5px 10px;
}



</style>