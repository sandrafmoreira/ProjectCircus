<template>
     <div class="main-section-graphic-el">
        <svg width="795" height="571" viewBox="0 0 795 571" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M666.959 487.31C444.981 631.343 136.989 565.484 -1.00004 468.989V9.07377C231.659 9.07377 754.878 -11.3421 754.878 9.07377C754.878 9.07377 888.937 343.277 666.959 487.31Z" fill="#121B43"/>
        </svg>
      </div>
  <section class="main-section-about">
      
      <div class="section-texts" >
          
          <h1 class="section-title">Sobre o Illusionni</h1>
          <p class="section-desc">Bem-vindo ao coração do nosso circo! <br> Aqui, partilhamos a nossa história, missão e os valores que nos movem! </p>
      </div>
     
      
      <div class="main-section-img">
    
      </div>
  </section>


  <section class="mission-section">
  <div class="mission-section-container">
    <!-- <h2 class="section-subtitle">A nossa missão para esta edição!</h2> -->
    <div class="mission-goals">
      <div class="goal">
        <img src="/src/assets/about_assets/magic-wand-wizard-svgrepo-com 2.svg" alt="icon">
        <h3 class="goal-title">Reinventar </h3>
        <p class="goal-description">A magia do circo ao promover um entretenimento que respeita o planeta e inspira as gerações futuras!</p>
      </div>

      <div class="goal">
        <img src="/src/assets/about_assets/fluent-emoji-high-contrast_circus-tent.svg" alt="icon">
        <h3 class="goal-title">Comprometermo-nos</h3>
        <p class="goal-description">A reinventar o circo como uma plataforma de entretenimento consciente, oferecendo espetáculos que iluminem corações e mentes!</p>
      </div>
      
      <div class="goal">
        <img src="/src/assets/about_assets/🦆 icon _Laugh Face with Beaming Eyes_.svg" alt="icon">
        <h3 class="goal-title">Trazer alegria</h3>
        <p class="goal-description">Ao público enquanto promovemos práticas conscientes e sustentáveis que reflitam no nosso compromisso com o planeta.</p>
      </div>
    </div>
  </div>
</section>

  <section class="our-history-section">
   <div class="our-history-container">
    <div class="history-graphic-el-about">
        <img src="/src/assets/about_assets/history_graphic_el.svg" alt="">
    </div>
    <div class="our-history-text" >
      <h2 class="section-subtitle">A nossa história!</h2>
      <p>Tudo começou com um sonho: criar um circo que capturasse a magia dos espetáculos tradicionais, enquanto abraçava ideias inovadoras. Ao longo dos anos, mantivemos viva a essência do circo clássico, encantando gerações com momentos únicos.</p>
      <br>
      <p>Para a edição deste ano, damos um passo em direção à sustentabilidade, ao adotar energia renovável para iluminar os nossos espetáculos!</p>
    </div>
    

   </div>
    
  </section>
  <section class="editions-section">
   <h2 class="section-subtitle">Edições anteriores</h2>
    <div class="editions-timeline-content">
      <v-timeline direction="horizontal">
        <v-timeline-item 
          v-for="(edition, i) in timelineEditions"
          :key="i"
          dot-color="#E4CB66"
          small
        >
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold --text`"
              v-text="edition.year"
            ></span>
          </template>
          <div class="py-4">
            <h3 :class="`headline `">
              {{edition.title}}
            </h3>
            <div>
              <p>{{ edition.desc }}</p>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
      
  
   
  </section>
 
 

  <Footer></Footer>
</template>



  <script >
    import Footer from '@/components/Footer.vue';
    
    export default {
      components: {
        Footer
      },

      data: () => ({
        timelineEditions: [
        {
          title:'Ilusionni Origins',
          desc:'A estreia do Circo Illusionni encantou o público com atos inovadores e uma mensagem de preservação ambiental.',
          
          year: '1990',
        },
        {
          title:'Ilusionni Origins',
          desc:'A estreia do Circo Illusionni encantou o público com atos inovadores e uma mensagem de preservação ambiental.',
          
          year: '2000',
        },
        {
          title:'Ilusionni Origins',
          desc:'A estreia do Circo Illusionni encantou o público com atos inovadores e uma mensagem de preservação ambiental.',
          
          year: '2010',
        },
        {
          title:'Ilusionni Origins',
          desc:'A estreia do Circo Illusionni encantou o público com atos inovadores e uma mensagem de preservação ambiental.',
          
          year: '2020',
        },
        {
          title:'Ilusionni Origins',
          desc:'A estreia do Circo Illusionni encantou o público com atos inovadores e uma mensagem de preservação ambiental.',
          
          year: '2025',
        },
      ],
    }),
    };
  </script>


<style scoped>

  .main-section-about{
    display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 8rem;
  
  }

  .main-section-graphic-el{
    position: absolute; 
    z-index: -1;
    left: 0;
    transform: translateY(-18%);

  }
  .section-desc{
    width: 80%;
  }
  .main-section-img,.section-texts {
  padding-bottom:15rem;
  height: 100%;
  
}

.section-texts h1, .section-texts p{
  color: white;
}

  .main-section-img{
    background-image: url('/src/assets/about_assets/about_main_clown.svg');
    background-size:unset;
    background-position:center bottom;
    
  }

  .mission-goals{
    display: grid;
    grid-template-columns: 25% 25% 25%;
    justify-content: space-between;
    padding: 7rem 2rem 4rem;
    

  }
  .goal{
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .goal img{
  width: 35px;
  } 

  /* history section------- */
  .our-history-container{
    display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 8rem;
  padding-bottom: 4rem;
  
  }


  .our-history-text p{
    width: 80%;
 
  }
  .history-graphic-el-about img{
    /* height: 80%; */
    position: absolute; 
    z-index: -1;
    left: 0;
    transform: translateY(-30%);
    
    /* background-image: url('src/assets/about_assets/history_graphic_el.svg'); */
  }

  /* editions section------- */

  .editions-section{
    margin-bottom: 2rem;
  }
  .editions-section .section-subtitle{
    margin-top: 10rem;
    margin-bottom: 2rem;
  }
  .editions-timeline-content span{
      font-size: 25px;
  }

  .editions-timeline-content h3{
      font-family: var(--font-Lexend);
      font-weight: 500;
      margin-bottom: 12px;
  }





</style>
