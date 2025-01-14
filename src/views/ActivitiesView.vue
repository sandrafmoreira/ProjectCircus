<template>
    <div>
        <section class="header">
            <div>
                <h1 class="parag">20ª Edição</h1>
                <h2 class="title">O Circo em Harmonia <br>com o Planeta</h2>
                <p class="header-desc">No nosso circo, os artistas trazem alegria e aprendizado! Nesta 20ª edição, <br>com muita criatividade, eles encontram formas divertidas de ensinar as crianças <br>que cuidar do planeta pode ser divertido, inspirador e cheio de magia.</p>
                <RouterLink :to="{name: 'pricing'}" class="link">Ver Programa</RouterLink>
            </div>
            <img src="/src/assets/ActivitiesView/Header.png" alt="" class="header-img">
        </section>

        <h2 style="font-size: 40px;">Os Nossos Espetáculos</h2>
        
        <!-- Cards -->
        <div class="cards">
            <v-card
                v-for="card in this.cards"
                class="mx-auto"
                max-width="344"
            >
                <img class="card-img" :src="card.src" alt="">  

                <v-card-text class="text">
                <!-- <div>Word of the Day</div> -->

                <p id="card-title">{{card.title}}</p>

                <!-- <p>adjective</p> -->
                <!-- <div class="text-medium-emphasis">
                    relating to or dependent on charity; charitable; charitable donations. Pertaining to alms.<br>
                    "an eleemosynary educational institution."
                </div> -->
                </v-card-text>

                <v-card-actions>
                <v-btn
                    text="Saber mais"
                    variant="text"
                    @click="card.reveal = !card.reveal"
                    class="btn"
                ></v-btn>
                </v-card-actions>

                <v-expand-transition>
                <v-card
                    v-if="card.reveal"
                    class="position-absolute w-100"
                    height="100%"
                    style="bottom: 0;"
                >
                    <v-card-text class="pb-0">
                    <!-- <p class="text-h4">Origin</p> -->

                    <p class="text-medium-emphasis">
                        {{ card.desc }}
                    </p>
                    </v-card-text>

                    <v-card-actions class="pt-0">
                    <v-btn
                        color="teal-accent-4"
                        text="Close"
                        variant="text"
                        @click="card.reveal = !card.reveal"
                    ></v-btn>
                    </v-card-actions>
                </v-card>
                </v-expand-transition>
            </v-card>
        </div>

        <div class="cont-workshops">

            <div class="workshops-intro">
                <div class="workshops-intro-text">
                    <h2 class="w-title">Cria e inspira-te <br>com os Workshops</h2>
                    <p style="margin-top: 20px">Além dos espetáculos, oferecemos workshops <br>exclusivos para te tornares num palhaço “verde”.</p>
                    <p style="margin-bottom: 30px">Idealizados para crianças e adultos, combina-se <br>a arte, aprendizado e sustentabilidade num único <br>ambiente criativo.</p>
                    <RouterLink :to="{name: 'pricing'}" class="link">Verificar Preços</RouterLink>
                </div>
                <img src="/src/assets/ActivitiesView/Palhacos.png" alt="">
            </div>
            

            <div class="workshops-content" style="margin-top: 60px">
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
                cards: [
                    {title: "Luzes", desc: "sdf", src: "/src/assets/ActivitiesView/AtuacaoEspecial.png", reveal: false},
                    {title: "Luzes", desc: "aaa", src: "/src/assets/ActivitiesView/Luzes.png", reveal: false},
                    {title: "Asas de Seda", desc: "fdvf", src: "/src/assets/ActivitiesView/AsasSeda.png", reveal: false},
                    {title: "Arte do Equilíbrio", desc: "21323", src: "/src/assets/ActivitiesView/Equilibrio.png", reveal: false},
                    {title: "Teatro de Sombras", desc: "h", src: "/src/assets/ActivitiesView/TeatroSombras.png", reveal: false},
                    {title: "Circo Verde", desc: "e", src: "/src/assets/ActivitiesView/CircoVerde.png", reveal: false},
                    {title: "Pirotecnia", desc: "l", src: "/src/assets/ActivitiesView/Pirotecnia.png", reveal: false},
                    {title: "Illusionni", desc: "p", src: "/src/assets/ActivitiesView/Illusionni.png", reveal: false},
                ]
            }
        },

    }
</script>

<style scoped>

    .parag {
        margin-top: 150px;
        font-size: 40px;
    }
    h2 {
        font-size: 50px;
    }

    .header-desc {
        font-size: 18px;
        line-height: 28px;
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .header-img {
        width: 520px;
        margin-top: 100px;
    }

    .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 99vw;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 70px;
        margin-top: 20px;
    }

    .mx-auto {
        width: 250px;
        padding: 0;
        background-color: #E9DED0;
    }
    .card-img {
        width: 100%;
    }
    #card-title {
        font-size: 22px;
        font-weight:bold;
    }
    

    .cont-workshops {
        width: 100%;
        background-image: url("/src/assets/ActivitiesView/WorkshopBG.png");
    }

    .w-title {
        margin-top: 150px;
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

    .link {
        background-color: #E63946;
        color: white;
        padding: 15px 20px;
        border-radius: 100px;
        text-transform:none;
    }
    .btn {
        background-color: #E63946;
        color: white;
        border-radius: 100px;
        text-transform:none;
        margin: -10px 0 10px 10px;
    }
    .link:hover, .btn:hover {
        background-color: #A90505;
    }
</style>