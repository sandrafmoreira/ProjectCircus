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
                <v-tab v-if="userStore.userInfo.adminPermission" text="Administradores" value="5"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab" class="windows">
                <v-tabs-window-item value="1">
                    <h2>{{ this.userStore.fullName }}</h2>
                    <p>Aqui podes consultar e editar os dados da tua conta. <br>Rever os bilhetes e produtos adquiridos durante a nossa <br>estadia, assim como os workshops em que te inscreveste.</p>
               
                    <v-card class="badges-section" flat>
                        <div>
                            <img v-if="!badge1.obtained" src="@/assets/AccountView/badge1-not-obtained.svg" alt="">
                            <img v-else src="@/assets/AccountView/badge1-obtained.svg" alt="">
                            <p v-if="badge1.used">Já utilizaste este código!</p>
                        </div>

                        <div>
                            <img v-if="!badge2.obtained" src="@/assets/AccountView/badge2-not-obtained.svg" alt="">
                            <img v-else src="@/assets/AccountView/badge2-obtained.svg" alt="">
                        </div>

                        <div>
                            <img v-if="!badge3.obtained" src="@/assets/AccountView/badge3-not-obtained.svg" alt="">
                            <img v-else src="@/assets/AccountView/badge3-obtained.svg" alt="">
                            <p v-if="badge3.used">Já utilizaste este código!</p>
                        </div>
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
                            <ul>
                                <li v-for="workshop in ticketStore.purchasedWorkshops" :key="workshop.id">
                                    
                                    <h3>{{ workshop.title }}</h3>
                                    <p>{{ workshop.description }}</p>
                                    <p>{{ workshop.price }}</p>
                                    <p>{{ workshop.quantity }}</p>
                                </li>
                            </ul>
                        </v-card-text>
                    </v-card>

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
                                    <h3>{{ (product.product.price).toFixed(2) }}€</h3>
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
                            label="Partilhar de Foto"
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
                            <v-card width="200px"  variant:="plain" class="share-gallery-card" flat="true">
                                <v-img :src="post.image" ></v-img>
                                <div class="share-gallery-card-actions">
                                    <v-card-text>
                                    <p>{{ post.caption }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="red" @click="removePost(index)" icon>
                                        <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                                
                            </v-card>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-tabs-window-item>

                <v-tabs-window-item value="4" >
                    <v-card :flat="true">
                        <h2 class="section-title">Editar Conta</h2>
                        <v-card-text>
                            <!-- <p style="color: red;">Antes de qualquer alteração, coloque a sua password para confirmar as alterações!</p> -->
                            <v-form @submit.prevent="editInformation" v-model="form">
                                    <v-text-field v-model="firstName" :rules="[required]"
                                    variant="plain"></v-text-field>
                                    <v-text-field  v-model="lastName"  :rules="[required]"  variant="plain"></v-text-field>
                                    <v-text-field v-model="email"  :rules="[required]"  type="email" variant="plain"></v-text-field>
                                    <v-text-field v-model="oldPassword" :rules="[required]" label="Old Password" type="password" variant="plain"></v-text-field>
                                    <v-text-field v-model="newPassword" label="New Password" type="password" variant="plain"></v-text-field>
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
</template>

<script>
import { useUserStore } from '@/stores/users';
import { useTicketStore } from "@/stores/ticket";

    export default {
        data() {
            return {
                 //Editar informações do utilizador
                form: false,
                tab: 1,
                id: 0,
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
                { url: '/src/assets/img/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 1' },
                { url: '/src/assets/img/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 2' },
                { url: '/src/assets/img/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 3' },
                { url: '/src/assets/img/pexels-gesel-792764.jpg', caption: 'Foto de exemplo 4' }
                ]
            }
        },

        mounted () {
            this.id = this.userStore.userInfo.id;
            this.firstName = this.userStore.userInfo.firstName;
            this.lastName = this.userStore.userInfo.lastName;
            this.email = this.userStore.userInfo.email;
            this.userStore.verifyBadges()

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

            addPost() {    
                this.uploadToAPI(); // Chama a função para fazer o upload da imagem
                
                this.userStore.addNewPost(this.userStore.fullName, this.postImageSrc.name, this.postCaption)
                alert('Publicação feita com sucesso!')
            },

            async uploadToAPI() {
                if (!this.postImageSrc) {
                    alert("Por favor, selecione uma imagem.");
                    return;
                }

                const formData = new FormData();
                formData.append("image", this.postImageSrc); // Adiciona o arquivo à FormData                
                formData.append("publicId", `user_${this.userStore.userInfo.id}`); // Adiciona um ID único, se necessário

                for (let pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
                }
                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData, // Envia a FormData com o arquivo
                    });

                    if (response.ok) {
                        const result = await response.json();
                        alert(`Imagem enviada com sucesso! URL: ${result.url}`);
                        // Adicionar a imagem ao sistema local
                        this.postImageSrc = result.url // Passa a URL da imagem para a variavel `postImageSrc`
                    } else {
                        throw new Error("Erro no envio da imagem.");
                    }
                } catch (error) {
                    console.error("Erro ao enviar imagem:", error);
                    alert("Ocorreu um erro ao enviar a imagem.");
                }
            },

            
            removePost(aa) {
                return
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

.left-tabs {
    width: 500px;
    height: 500px;
    padding:100px 100px;
    background-image: url("/src/assets/AccountView/bg-tabs.png");
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


// edit account

.v-card{
    background-color: transparentize($color: #f7f1f1, $amount: 1);
}

.v-form{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

</style>