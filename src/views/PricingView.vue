<template>
    <section class="header">
        <div>
            <h1>Reserva a tua diversão!</h1>
            <p>Explore os nossos pacotes de bilhetes, workshops <br>e descontos exclusivos para famílias e escolas. <br>Organize o seu dia no circo de forma fácil e acessível!</p>
        </div>
        <img src="/src/assets/PricingView/header.png" alt="">
    </section>

    <!-- Programa Geral -->
    <section class="program">
        <img style="margin-left: 100px;" src="/src/assets/PricingView/palhaço.png" alt="">
        <div>
            <h2 class="program-title">Programa geral</h2>
            <img src="/src/assets/PricingView/programa.png" alt="">
        </div>
    </section>

    <!-- Preços -->
    <h2 class="prices-title">Preços</h2>
    <section class="prices">
        <img src="/src/assets/PricingView/bilheteAdulto.png" alt="">
        <img src="/src/assets/PricingView/bilheteCrianca.png" alt="">
        <img src="/src/assets/PricingView/bilhetePacote.png" alt="">
        <div class="cont-bilhete-instituicoes" style="width: 250px;">
            <img src="/src/assets/PricingView/bilheteInstituicoes.png" alt="" style="width: 250px;">
                <RouterLink :to="{name: 'contacts'}" class="btn-contactos">
                    Entrar em contacto
                    <img src="" alt="icon arrow">
                </RouterLink>
                
        </div>
    </section>

    <!-- Workshops -->
     <img style="width: 90vw; margin: 100px 0;" src="/src/assets/PricingView/workshops.png" alt="">

    <!-- Agendar Reserva -->
    <v-stepper :items="['Step 1', 'Step 2', 'Step 3', 'Step 4']">
        <template v-slot:item.1>
            <v-card title="Step One" flat>
                <h2>Faça a sua reserva</h2>
                <h3>Escolhe o dia e a bancada</h3>
                <p>Escolher data:</p>
                <ul>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                    <button>24/01/24</button><br>
                </ul>
                <p>Escolher zona:</p>
                <section>
                    <div>
                        <button>A</button>
                        <div>
                            <p>Adulto 20€</p>
                            <p>Criança 15€</p>
                        </div>
                    </div>
                    <br>
                    <div>
                        <button>B</button>
                        <div>
                            <p>Adulto 15€</p>
                            <p>Criança 12€</p>
                        </div>
                    </div>
                    <br>
                    <div>
                        <button>C</button>
                        <div>
                            <p>Adulto 12€</p>
                            <p>Criança 8€</p>
                        </div>
                    </div>
                    <br>
                </section>
            </v-card>
        </template>

        <template v-slot:item.2>
            <v-card title="Step Two" flat>
                <!-- Selected tickets -->
                <section>
                    <h2>Circo Illusionni</h2>
                    <p>20ª Edição - O circo e o Planeta</p>
                    <ul>
                        <li v-for="ticket in selectedTickets" :key="ticket.id">
                            <h3>{{ ticket.title }}</h3>
                            <p>{{ ticket.description }}</p>
                            <p>{{ ticket.price }}</p>
                            <p>quantity: {{ getTicketQuantity(ticket.id) }}</p>
                        </li>
                    </ul>
                </section>
                <h2>Escolhe os bilhetes</h2>
                <ul>
                    <li v-for="ticket in availableTickets" :key="ticket.id">
                        <h3>{{ ticket.title }}</h3>
                        <h3>{{ ticket.description }}</h3>
                        <h3>{{ ticket.price }}</h3>
                        <button @click="decreaseTicket(ticket)">-</button>
                        <span>{{ getTicketQuantity(ticket.id) }}</span>
                        <button @click="increaseTicket(ticket)">+</button>
                    </li>
                </ul>
            </v-card>
        </template>

        <template v-slot:item.3>
            <v-card title="Step Three" flat>
                <!-- Selected tickets -->
                <section>
                    <h2>Circo Illusionni</h2>
                    <p>20ª Edição - O circo e o Planeta</p>

                    <ul>
                        <li v-for="ticket in selectedTickets" :key="ticket.id">
                            <h3>{{ ticket.title }}</h3>
                            <p>{{ ticket.description }}</p>
                            <p>{{ ticket.price }}</p>
                            <p>quantity: {{ getTicketQuantity(ticket.id) }}</p>
                        </li>
                    </ul>
                </section>
                <h2>Adiciona workshops</h2>
                <ul>
                    <li v-for="workshop in availableWorkshops" :key="workshop.id">
                        <h3>{{ workshop.title }}</h3>
                        <h3>{{ workshop.description }}</h3>
                        <h3>{{ workshop.price }}</h3>
                        <button @click="decreaseWorkshop(workshop)">-</button>
                        <span>{{ getWorkshopQuantity(workshop.id) }}</span>
                        <button @click="increaseWorkshop(workshop)">+</button>
                    </li>
                </ul>
                <button @click="changeTab(4)" >Continuar</button>   
            </v-card>
        </template>

        <template v-slot:item.4>
            <v-card title="Step Four" flat>
                <!-- Selected tickets -->
                <section>
                    <h2>Circo Illusionni</h2>
                    <h3>20ª Edição - O circo e o Planeta</h3>

                    <div>
                        <img src="" alt="icon">
                        <p>{{ selectedDate }}</p>
                    </div>

                    <div>
                        <img src="" alt="icon">
                        <p>Parque da Cidade, Porto</p>
                    </div>

                    <div>
                        <p>{{ selectedTickets.length }} Bilhetes Zona {{ selectedZone }}</p>
                        <p>{{ selectedTickets.title }}</p>
                    </div>

                    <div>
                        <p>{{ selectedTickets.length }} </p>
                        <p>{{ selectedTickets.title }}</p>
                    </div>

                    <ul>
                        <p>{{ selectedTickets.length }} Bilhetes Zona {{ selectedZone }}</p>
                        <li v-for="ticket in selectedTickets" :key="ticket.id">
                            <p>quantity: {{ getTicketQuantity(ticket.id) }}</p> 
                            <h3>{{ ticket.title }}</h3>
                            <p>{{ ticket.price }}</p>
                        </li>
                    </ul>
                </section>

                <button @click="addToCart">Adicionar bilhetes ao carrinho</button> 
            </v-card>
        </template>
    </v-stepper>





    <!-- Selected tickets -->
    <section v-if="selectedTickets.length > 0">
        <h2>Circo Illusionni</h2>
        <p>20ª Edição - O circo e o Planeta</p>
        <ul>
            <li v-for="ticket in selectedTickets" :key="ticket.id">
                <h3>{{ ticket.title }}</h3>
                <p>{{ ticket.description }}</p>
                <p>{{ ticket.price }}</p>
                <p>quantity: {{ getTicketQuantity(ticket.id) }}</p>
            </li>
        </ul>
    </section>

    <section>
        <!-- Tab1 -->
        <div id="tab1" v-if="tabSelected == 1">
            <h2>Escolhe o dia e a bancada</h2>
            <button @click="changeTab(2)" >Continuar</button>
        </div>

        <!-- Tab2 -->
        <div id="tab2" v-else-if="tabSelected == 2">
            <h2>Escolhe os bilhetes</h2>
            <ul>
                <li v-for="ticket in availableTickets" :key="ticket.id">
                    <h3>{{ ticket.title }}</h3>
                    <h3>{{ ticket.description }}</h3>
                    <h3>{{ ticket.price }}</h3>
                    <button @click="decreaseTicket(ticket)">-</button>
                    <span>{{ getTicketQuantity(ticket.id) }}</span>
                    <button @click="increaseTicket(ticket)">+</button>
                </li>
            </ul>
            <button @click="changeTab(3)" >Continuar</button>
        </div>

        <!-- Tab3 -->
        <div id="tab3" v-else-if="tabSelected == 3">
            <h2>Adiciona workshops</h2>
            <ul>
                <li v-for="workshop in availableWorkshops" :key="workshop.id">
                    <h3>{{ workshop.title }}</h3>
                    <h3>{{ workshop.description }}</h3>
                    <h3>{{ workshop.price }}</h3>
                    <button @click="decreaseWorkshop(workshop)">-</button>
                    <span>{{ getWorkshopQuantity(workshop.id) }}</span>
                    <button @click="increaseWorkshop(workshop)">+</button>
                </li>
            </ul>
            <button @click="changeTab(4)" >Continuar</button>
        </div>

        <!-- Tab4 -->
        <div id="tab4" v-else-if="tabSelected == 4">
            <h2>Verifica</h2>
            <button @click="addToCart">Adicionar ao carrinho</button>
        </div>
    </section>
    
</template>

<script>
    import { RouterLink, RouterView } from 'vue-router'

    import { useTicketStore } from '@/stores/ticket'

    export default {
        data() {
            return {
                tabSelected: 1,
                ticketStore: useTicketStore(),
                availableTickets: [
                    { id: 1, title: "Adulto", description: "Bilhete individual", price: "12.00€" },
                    { id: 2, title: "Criança", description: "Bilhete individual", price: "8.00€" },
                    { id: 3, title: "Pack Familiar", description: "2 adultos 2 crianças", price: "30.00€" },
                ],
                availableWorkshops: [
                    { id: 1, title: "Malabarismo Sustentável", description: "Limite de pessoas: 30", price: "4.00€" },
                    { id: 2, title: "Oficina de Acrobacias", description: "Limite de pessoas: 15", price: "6.00€" },
                    { id: 3, title: "Técnicas de Palhaçaria", description: "Limite de pessoas: 30", price: "4.00€" },
                ],
                selectedTickets: [], //To store selected tickets before adding them to the cart
                selectedWorkshops: [] //To store selected workshops before adding them to the cart
            }
        },
        methods: {
            changeTab(number) {
                this.tabSelected = number
            },
            increaseTicket(ticket) {
                //Check if ticket is already in selectedTickets
                const existingTicket = this.selectedTickets.find(t => t.id === ticket.id);
                if (existingTicket) {
                    existingTicket.quantity++;
                } else {
                    this.selectedTickets.push({ ...ticket, quantity: 1 });
                }
            },
            decreaseTicket(ticket) {
                const existingTicket = this.selectedTickets.find(t => t.id === ticket.id);
                if (existingTicket.quantity > 1) {
                    existingTicket.quantity--;
                } else if (existingTicket) {
                    this.selectedTickets = this.selectedTickets.filter(t => t.id !== ticket.id);
                }
            },
            getTicketQuantity(ticketId) {
                const ticket = this.selectedTickets.find(t => t.id === ticketId);
                return ticket ? ticket.quantity : 0;
            },
            increaseWorkshop(workshop) {
                //Check if ticket is already in selectedTickets
                const existingWorkshop = this.selectedWorkshops.find(w => w.id === workshop.id);
                if (existingWorkshop) {
                    existingWorkshop.quantity++;
                } else {
                    this.selectedWorkshops.push({ ...workshop, quantity: 1 });
                }
            },
            decreaseWorkshop(workshop) {
                const existingWorkshop = this.selectedWorkshops.find(w => w.id === workshop.id);
                if (existingWorkshop.quantity > 1) {
                    existingWorkshop.quantity--;
                } else if (existingWorkshop) {
                    this.selectedWorkshops = this.selectedWorkshops.filter(w => w.id !== workshop.id);
                }
            },
            getWorkshopQuantity(workshopId) {
                const workshop = this.selectedWorkshops.find(w => w.id === workshopId);
                return workshop ? workshop.quantity : 0;
            },
            addToCart() {
                //Add all selected tickets to the store
                this.selectedTickets.forEach(ticket => {
                    for (let i = 0; i < ticket.quantity; i++) {
                    this.ticketStore.addPurchasedTicket(ticket);
                    }
                });

                this.selectedTickets = [];
                alert("Tickets added to cart successfully. They will now show up on Histórico de Produtos.");
            },
        },
    }
</script>

<style scoped>

    .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 95vw;
    }

    h1, h2, p {
        color: #121B43;
    }

    h1 {
        margin-top: 300px;
    }

    .program {
        display: flex;
        flex-wrap: wrap;
        margin: 50px 0;
        width: 95vw;
        gap: 150px;
    }

    .program-title {
        margin-left: 180px;
        padding: 30px;
    }

    .prices-title {
        margin: 150px 0 20px 0;
    }
    .prices {
        display: flex;  
        flex-wrap: wrap;
        justify-content: space-around; 
        align-items: flex-start;
        gap: 30px
    }

    .prices > img {
        width: 250px;
    }

    .cont-bilhete-instituicoes {
        position: relative;
    }

    .btn-contactos {
        position: absolute;
        bottom: 10px;         
        left: 5px; 
        background-color: #E63946;
        color: white;
        padding: 10px 20px;
        border-radius: 100px;
    }


</style>