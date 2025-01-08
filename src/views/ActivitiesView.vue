<template>
    <div>
        <section class="header">
            <div>
                <h1>O Circo em Harmonia com o Planeta</h1>
                <p>No nosso circo, os artistas trazem alegria e aprendizado! Nesta 20ª edição, <br>com muita criatividade, eles encontram formas divertidas de ensinar as crianças <br>que cuidar do planeta pode ser divertido, inspirador e cheio de magia.</p>
                <RouterLink :to="{name: 'pricing'}">Ver Programa</RouterLink>
            </div>
            <img src="/src/assets/ActivitiesView/Header.png" alt="" style="width: 40vw;">
        </section>

        <h3>Os Nossos Espetáculos</h3>
        <div class="cards">
            <v-card
                v-for="card in this.cards"
                class="mx-auto"
                max-width="344"
            >
                <v-card-text>
                <img class="card-img" :src="card.src" alt="">  
                <div>Word of the Day</div>

                <p class="text-h4 font-weight-black">el·ee·mos·y·nar·y</p>

                <p>adjective</p>

                <div class="text-medium-emphasis">
                    relating to or dependent on charity; charitable; charitable donations. Pertaining to alms.<br>
                    "an eleemosynary educational institution."
                </div>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="teal-accent-4"
                    text="Learn More"
                    variant="text"
                    @click="reveal = true"
                ></v-btn>
                </v-card-actions>

                <v-expand-transition>
                <v-card
                    v-if="reveal"
                    class="position-absolute w-100"
                    height="100%"
                    style="bottom: 0;"
                >
                    <v-card-text class="pb-0">
                    <p class="text-h4">Origin</p>

                    <p class="text-medium-emphasis">
                        late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
                    </p>
                    </v-card-text>

                    <v-card-actions class="pt-0">
                    <v-btn
                        color="teal-accent-4"
                        text="Close"
                        variant="text"
                        @click="reveal = false"
                    ></v-btn>
                    </v-card-actions>
                </v-card>
                </v-expand-transition>
            </v-card>
        </div>

        <div class="cont-workshops">

            <div class="workshops-intro">
                <div class="workshops-intro-text">
                    <h2>Cria e inspira-te <br>com os Workshops</h2>
                    <p>Além dos espetáculos, oferecemos workshops <br>exclusivos para te tornares num palhaço “verde”.</p>
                    <p>Idealizados para crianças e adultos, combina-se <br>a arte, aprendizado e sustentabilidade num único <br>ambiente criativo.</p>
                    <RouterLink :to="{name: 'pricing'}">Verificar Preços</RouterLink>
                </div>
                <img src="/src/assets/ActivitiesView/Palhacos.png" alt="">
            </div>
            

            <div class="workshops-content">
                <div>
                    <h4>Malabarismo Sustentável</h4>
                    <p>O malabarismo pode ser uma arte <br>acessível e ecológica, promovendo a <br>reutilização criativa de materiais enquanto <br>são desenvolvidas habilidades motoras <br>e de concentração.</p>
                </div>
                <div>
                    <h4>Oficina de Acrobacias</h4>
                    <p>Uma introdução ao mundo das acrobacias <br>circenses, ensinando movimentos simples de <br>equilíbrio e flexibilidade, como pirâmides <br>humanas, rolagens e truques com <br>tecidos baixos.</p>
                </div>
                <div>
                    <h4>Técnicas de Palhaçaria</h4>
                    <p>Ensinar o básico da arte de ser <br>palhaço, com foco em expressão <br>corporal, improvisação e uso de <br>humor para  conectar com o público.</p>
                </div>
                </div>
        
        </div>
    </div>
</template>

<script>
   import { RouterLink } from 'vue-router'


    export default {
        data() {
            return {
                reveal: false,
                cards: [
                    {src: "/src/assets/ActivitiesView/AtuacaoEspecial.png"},
                    {src: "/src/assets/ActivitiesView/Luzes.png"},
                    {src: "/src/assets/ActivitiesView/AsasSeda.png"},
                    {src: "/src/assets/ActivitiesView/Equilibrio.png"},
                    {src: "/src/assets/ActivitiesView/TeatroSombras.png"},
                    {src: "/src/assets/ActivitiesView/CircoVerde.png"},
                    {src: "/src/assets/ActivitiesView/Pirotecnia.png"},
                    {src: "/src/assets/ActivitiesView/Illusionni.png"},
                ]
            }
        },

    }
</script>

<style scoped>

    .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 99vw;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .mx-auto {
        width: 250px;
    }
    .card-img {
        width: 250px;
    }

    .cont-workshops {
        width: 100%;
        background-image: url("/src/assets/ActivitiesView/WorkshopBG.png");
    }

    .workshops-intro {
        display: flex;
        justify-content: space-between;
    }

    .workshops-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>