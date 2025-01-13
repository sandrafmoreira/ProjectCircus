<template>

    <section class="main-section-contacts">
        <div class="">
            <div class="section-text" >
            <h1 class="section-title">Entra em contacto connosco!</h1>
            <p class="section-desc">Seja para planear uma visita ao circo, esclarecer dúvidas sobre os bilhetes ou simplesmente partilhar a tua opinião, a nossa equipa está disponível para ti!</p>
            </div>
            <div class="main-section-contacts-info" >

                <div class="contact-info">
                    <v-icon>
                      mdi-email
                    </v-icon>
                    <p>Escola de Media Artes e Design, Vila do Conde, Portugal</p>
                </div>
                
                <div class="contact-info">
                    <v-icon>
                      mdi-phone
                    </v-icon>
                    <p>+123 123456789 <br>
                        +321 987654321</p>
                </div>
                <div class="contact-info">
                    <v-icon>
                      mdi-map-marker-radius

                    </v-icon>
                    <p>circo@gmail.com</p>
                </div>
             
            </div>
        </div>

        <div class="contact-form">
           
            <input type="text" placeholder="Nome" class="form-input">
            <input type="email" placeholder="E-mail" class="form-input">
            <textarea name="msg" id="msg" placeholder="Assunto"  ></textarea>

            
            <button class="btn-red">
                Enviar 
            </button>

        </div>
       
  
    </section>
    <div class="graphic-el-contacts">
      <img src="/src/assets/ContactView/contacts_graphic_el.svg" alt="">
    </div>
   
    <section>
      <h2 class="section-subtitle">As perguntas mais frequentes</h2>
      <v-row justify="center">
        <v-expansion-panels flat="true" variant="inset" >
          <v-expansion-panel
            v-for="(fqs,i) in faqItems"
        :key="i"
          >
            <v-expansion-panel-title>{{ fqs.question }} <hr>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
             <p>{{ fqs.answer }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

    </section>

    <Footer></Footer>
  
</template>
<script>
    import Footer from '@/components/Footer.vue';
    export default {
        components: {
        Footer,
    },

    data() {
      return {
        faqItems:[
          {
            question: "Que medidas de sustentabilidade o circo vai adotar para esta edição?",
            answer: "O circo implementará práticas sustentáveis, como a utilização de materiais recicláveis, redução do uso de plástico, e programas de sensibilização ambiental para os visitantes."
          },
          {
            question: "O circo possui opções de acessibilidade para pessoas com mobilidade reduzida?",
            answer: "Sim, temos rampas de acesso, lugares reservados e apoio especializado para garantir uma experiência inclusiva a todos os visitantes."
          },
          {
            question: "Há restrições de segurança ou itens proibidos no festival?",
            answer: "Sim, itens perigosos como armas, materiais inflamáveis, e substâncias proibidas não são permitidos. Por favor, consulte a lista completa no nosso regulamento oficial."
          },
          {
            question: "Posso trocar ou reembolsar o meu bilhete após a compra?",
            answer: "Os bilhetes não são reembolsáveis após a compra, mas podem ser trocados por outra data disponível, sujeito à política de trocas do evento."
          }
          ]

      }
    },
   
    }
</script>

<style lang="scss" scoped>

.main-section-contacts {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 8rem;
  height: 40rem;
  
}

.main-section-contacts-info{
    padding-top: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    align-items: start;
   
}
.contact-info{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
}

.contact-info .v-icon{
  font-size: 2rem;
}

.contact-form{

    padding: 80px 60px 20px;
    display: flex;
    flex-direction: column;
    gap: 4%;
    
   
}

.contact-form textarea{
  font-size: 16px;
  border: none;
  background-color: var(--color-input);
  color: var(--color-blue-text);
  width: 100%;
  height: 180px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 25px;
  resize: none;
}

.graphic-el-contacts{
    position: absolute; /* ou absolute, dependendo do layout */
    z-index: -1;
    right: 0;
    top: 70%;
}


//--------

.v-expansion-panels{
  cursor: pointer;
  margin: 2rem 0rem 10rem;
  
}

.v-expansion-panel{
  // background-color: var(--color-body);s
  background-color: transparentize($color: #ffffff, $amount: 1);
  color: var(--color-blue-text);

}
.v-expansion-panel-title{
  font-family: var(--font-Lexend);
  font-size: 1.18rem;
  font-weight: 400;
  padding-bottom: 2rem;

}

.v-expansion-panel-title__icon{
  background-color: var( --color-red-btn);
  color: #fff;
  border-radius: 50px;
}

.v-expansion-panel-text{
  font-size: 1rem;

}
  
</style>