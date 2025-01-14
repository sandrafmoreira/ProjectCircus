<template>
    <section class="header">
        <div>
            <h1 class="first-title">Reserva a tua diversão!</h1>
            <p class="desc-header">Explore os nossos pacotes de bilhetes, workshops <br>e descontos exclusivos para famílias e escolas. <br>Organize o seu dia no circo de forma fácil e acessível!</p>
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
    <section class="buy" style="background-color: #121B43;"> 

        <template v-if="tabSelected === 1" class="tab">
            <h3 style="font-size: 32px; font-weight: 300;">Faça a sua reserva</h3>
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p class="title-reserva">Escolher data:</p>
                    <div style="display: flex;">
                        <div class="btn-date">
                            <button disabled>12/01/24</button><br>
                            <button @click="selectDate('16')">16/01/24</button><br>
                            <button @click="selectDate('18')">18/01/24</button><br>
                            <button disabled>22/01/24</button><br>
                            <button @click="selectDate('26')">26/01/24</button><br>
                        </div>
                        <div class="btn-date">
                            <button disabled>14/01/24</button><br>
                            <button @click="selectDate('17')">17/01/24</button><br>
                            <button @click="selectDate('19')">19/01/24</button><br>
                            <button @click="selectDate('24')">24/01/24</button><br>
                            <button disabled>26/01/24</button><br>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="title-reserva">Escolher zona:</p>
                    <div style="display: flex;">
                        <div>
                            <div style="display: flex;">
                                <button class="btn-bancada" @click="selectZone('A')">A</button>
                                <div>
                                    <p>Adulto 20€</p>
                                    <p>Criança 15€</p>
                                </div>
                            </div>
                            <br>
                            <div style="display: flex;">
                                <button class="btn-bancada" @click="selectZone('B')">B</button>
                                <div>
                                    <p>Adulto 15€</p>
                                    <p>Criança 12€</p>
                                </div>
                            </div>
                            <br>
                            <div style="display: flex;">
                                <button class="btn-bancada" @click="selectZone('C')">C</button>
                                <div>
                                    <p>Adulto 12€</p>
                                    <p>Criança 8€</p>
                                </div>
                            </div>
                        </div>
                        <img src="/src/assets/PricingView/Mapa.png" alt="" width="300px">
                    </div>
                </div>
                
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                <button :disabled="!selectedDate || !selectedZone" @click="changeTab(2)" style="align-self: flex-end;">Continuar</button>
            </div>
        </template>

        <!-- Escolher bilhetes: -->
        <template v-if="tabSelected === 2" class="tab">
            <button @click="changeTab(1)">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="50" width="50" height="50" rx="25" transform="rotate(-90 0 50)" fill="#E63946"/>
                <path d="M36.6668 25L13.3335 25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.9997 36.6665L13.333 24.9998L24.9997 13.3332" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <p>Programa / Adquirir bilhetes</p>

            <div style="display: flex;justify-content: space-between;">
                <section>
                    <div class="selected-section">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.95 2.7H21.6V1.35C21.6 0.54 21.06 0 20.25 0C19.44 0 18.9 0.54 18.9 1.35V2.7H8.1V1.35C8.1 0.54 7.56 0 6.75 0C5.94 0 5.4 0.54 5.4 1.35V2.7H4.05C1.755 2.7 0 4.455 0 6.75V8.1H27V6.75C27 4.455 25.245 2.7 22.95 2.7ZM0 22.95C0 25.245 1.755 27 4.05 27H22.95C25.245 27 27 25.245 27 22.95V10.8H0V22.95ZM20.25 13.5C21.06 13.5 21.6 14.04 21.6 14.85C21.6 15.66 21.06 16.2 20.25 16.2C19.44 16.2 18.9 15.66 18.9 14.85C18.9 14.04 19.44 13.5 20.25 13.5ZM20.25 18.9C21.06 18.9 21.6 19.44 21.6 20.25C21.6 21.06 21.06 21.6 20.25 21.6C19.44 21.6 18.9 21.06 18.9 20.25C18.9 19.44 19.44 18.9 20.25 18.9ZM13.5 13.5C14.31 13.5 14.85 14.04 14.85 14.85C14.85 15.66 14.31 16.2 13.5 16.2C12.69 16.2 12.15 15.66 12.15 14.85C12.15 14.04 12.69 13.5 13.5 13.5ZM13.5 18.9C14.31 18.9 14.85 19.44 14.85 20.25C14.85 21.06 14.31 21.6 13.5 21.6C12.69 21.6 12.15 21.06 12.15 20.25C12.15 19.44 12.69 18.9 13.5 18.9ZM6.75 13.5C7.56 13.5 8.1 14.04 8.1 14.85C8.1 15.66 7.56 16.2 6.75 16.2C5.94 16.2 5.4 15.66 5.4 14.85C5.4 14.04 5.94 13.5 6.75 13.5ZM6.75 18.9C7.56 18.9 8.1 19.44 8.1 20.25C8.1 21.06 7.56 21.6 6.75 21.6C5.94 21.6 5.4 21.06 5.4 20.25C5.4 19.44 5.94 18.9 6.75 18.9Z" fill="white"/>
                        </svg>
                        <p>{{ selectedDate }} de janeiro de 2025</p>
                    </div>
                    
                    <div class="selected-section">
                        <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.9" d="M11 0C4.92525 0 0 4.36556 0 9.75C0 11.8702 0.784208 13.8157 2.08771 15.4091C2.11108 15.4472 2.11475 15.4899 2.14133 15.5265L9.47467 25.2765C9.81475 25.7286 10.3877 26 11 26C11.6123 26 12.1853 25.7286 12.5253 25.2765L19.8587 15.5265C19.8857 15.4899 19.8889 15.4472 19.9123 15.4091C21.2158 13.8157 22 11.8702 22 9.75C22 4.36556 17.0748 0 11 0ZM11 13C8.97508 13 7.33333 11.5448 7.33333 9.75C7.33333 7.95519 8.97508 6.5 11 6.5C13.0249 6.5 14.6667 7.95519 14.6667 9.75C14.6667 11.5448 13.0249 13 11 13Z" fill="white"/>
                        </svg>
                        <p>Parque da Cidade, Porto</p>
                    </div>
                </section>

                <div>
                    <h2>Escolhe os bilhetes</h2>
                    <ul style="display: flex;">
                        <li v-for="ticket in availableTickets" :key="ticket.id">
                            <h3>{{ ticket.title }}</h3>
                            <h3>{{ ticket.description }}</h3>
                            <h3>{{ ticket.price }}</h3>
                            <button @click="decreaseTicket(ticket)">-</button>
                            <span>{{ getTicketQuantity(ticket.id) }}</span>
                            <button @click="increaseTicket(ticket)">+</button>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                    <button :disabled="!selectedTickets.length" @click="changeTab(3)" style="align-self: flex-end;">Continuar</button>
            </div>

        </template>

        <template v-if="tabSelected === 3" class="tab">
            <div title="Step Three" flat>
                <section>
                    <h2>Circo Illusionni</h2>
                    <p>20ª Edição - O circo e o Planeta</p>
                    <p>Data Selecionada: {{ selectedDate }}</p>
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
                <button @click="changeTab(4)" :disabled="!selectedTickets.length && !selectedWorkshops.length">Continuar</button>   
            </div>
        </template>

        <template v-if="tabSelected === 4" class="tab">
            <div title="Step Four" flat>
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
            </div>
        </template>
    </section>
    
    </template>

    <script>
    import { RouterLink, RouterView } from 'vue-router'

    import { useTicketStore } from '@/stores/ticket'

    export default {
    data() {
        return {
            tabSelected: 1,
            selectedZone: "",
            ticketStore: useTicketStore(),
            selectedDate: "",
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
            this.tabSelected = number;
        },
        increaseTicket(ticket) {
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
        selectDate(date) {
            this.selectedDate = date;
        },
        selectZone(zone) {
            this.selectedZone = zone;
        }

    }
}
</script>

<style scoped>

    .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100vw;
    }

    .first-title, .desc-header {
        color: #121B43;
    }

    h1, h2, h3, p, button {
        color: white;
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
        color: #121B43;
    }

    .prices-title {
        margin: 150px 0 20px 0;
        color: #121B43;
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

    .selected-section, .selected-ammount {
        display: flex;
    }

    .tab {
        background-color: #121B43;
    }

    .buy {
        width: 100vw;
        padding: 5vw
    }

    .btn-date > button:disabled {
        font-weight: 100;
        border: 1px solid white;
    }
    .btn-date > button {
        padding: 8px 20px;
        margin: 20px 20px 0 0;
        border: 3px solid white;
        border-radius: 100px;
        font-size: 20px;
    }

    .title-reserva {
        margin-top: 30px;
        font-size: 24px;
        font-weight: 500;
    }

    .btn-bancada {
    } 
</style>