<template>

    <section class="main-section">
        <div class="main-section-contacts">
            <div class="main-section-text" >
            <h1 class="main-section-title">Entra em contacto connosco!</h1>
            <p class="main-section-desc">Seja para planear uma visita ao circo, esclarecer dúvidas sobre os bilhetes ou simplesmente partilhar a tua opinião, a nossa equipa está disponível para ti!</p>
            </div>
            <div class="main-section-contacts-info" >

                <div class="contact-info">
                    icon
                    <p>circo@gmail.com</p>
                </div>
                <div class="contact-info">
                    icon
                    <p>+123 123456789 <br>
                        +321 987654321</p>
                </div>
                <div class="contact-info">
                    icon
                    <p>Escola de Media Artes e Design, Vila do Conde, Portugal</p>
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

    <section class="section">
        <h2>As perguntas mais frequentes!</h2>
        <div class="FQAs-container">

     
            <div class="accordion">
                <div class="accordion-item">
                <button id="accordion-button-1" aria-expanded="false">
                    <span class="accordion-title">Why is the moon sometimes out during the day?</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                    Ut tortor pretium viverra suspendisse potenti.
                    </p>
                </div>
                </div>
                <div class="accordion-item">
                <button id="accordion-button-2" aria-expanded="false">
                    <span class="accordion-title">Why is the sky blue?</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                    Ut tortor pretium viverra suspendisse potenti.
                    </p>
                </div>
                </div>
                <div class="accordion-item">
                <button id="accordion-button-3" aria-expanded="false">
                    <span class="accordion-title">Will we ever discover aliens?</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                    Ut tortor pretium viverra suspendisse potenti.
                    </p>
                </div>
                </div>
                <div class="accordion-item">
                <button id="accordion-button-4" aria-expanded="false">
                    <span class="accordion-title">How much does the Earth weigh?</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                    Ut tortor pretium viverra suspendisse potenti.
                    </p>
                </div>
                </div>
                <div class="accordion-item">
                <button id="accordion-button-5" aria-expanded="false">
                    <span class="accordion-title">How do airplanes stay up?</span>
                    <span class="icon" aria-hidden="true"></span>
                </button>
                <div class="accordion-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut.
                    Ut tortor pretium viverra suspendisse potenti.
                    </p>
                </div>
                </div>
            </div>
        </div>
                
    </section>
</template>

<script>
    export default {
    // methods:{
    //     const items = document.querySelectorAll('.accordion button');
    //     toggleAccordion() {
    //         const itemToggle = this.getAttribute('aria-expanded');

    // for (i = 0; i < items.length; i++) {
    //     items[i].setAttribute('aria-expanded', 'false');
    // }

    // if (itemToggle == 'false') {
    //     this.setAttribute('aria-expanded', 'true');
    // }
    //     }
    //     items.forEach((item) => item.addEventListener('click', toggleAccordion));
    // }

       


    }
</script>

<style lang="scss" scoped>

.main-section {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 8rem;
  height: 40rem;
  
}

.main-section-contacts-info{
    padding-top: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: 33% 33% 33%;
   
}
.contact-info{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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

// -------

@import url('https://fonts.googleapis.com/css?family=Hind:300,400&display=swap');

* {
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}
.container {
  margin: 0 auto;
  padding: 4rem;
  width: 48rem;
}

.accordion .accordion-item {
  border-bottom: 1px solid #e5e5e5;
}

.accordion .accordion-item button[aria-expanded='true'] {
  border-bottom: 1px solid var(--color-blue-text);
}

.accordion button {
  position: relative;
  display: block;
  text-align: left;
  width: 100%;
  padding: 1em 0;
  color: #7288a2;
  font-size: 1.15rem;
  font-weight: 400;
  border: none;
  background: none;
  outline: none;
}

.accordion button:hover,
.accordion button:focus {
  cursor: pointer;
  color: #03b5d2;
}

.accordion button:hover::after,
.accordion button:focus::after {
  cursor: pointer;
  color: #03b5d2;
  border: 1px solid #03b5d2;
}

.accordion button .accordion-title {
  padding: 1em 1.5em 1em 0;
}

.accordion button .icon {
  display: inline-block;
  position: absolute;
  top: 18px;
  right: 0;
  width: 22px;
  height: 22px;
  border: 1px solid;
  border-radius: 22px;
}

.accordion button .icon::before {
  display: block;
  position: absolute;
  content: '';
  top: 9px;
  left: 5px;
  width: 10px;
  height: 2px;
  background: currentColor;
}
.accordion button .icon::after {
  display: block;
  position: absolute;
  content: '';
  top: 5px;
  left: 9px;
  width: 2px;
  height: 10px;
  background: currentColor;
}

.accordion button[aria-expanded='true'] {
  color: #03b5d2;
}
.accordion button[aria-expanded='true'] .icon::after {
  width: 0;
}
.accordion button[aria-expanded='true'] + .accordion-content {
  opacity: 1;
  max-height: 9em;
  transition: all 200ms linear;
  will-change: opacity, max-height;
}
.accordion .accordion-content {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 200ms linear, max-height 200ms linear;
  will-change: opacity, max-height;
}
.accordion .accordion-content p {
  font-size: 1rem;
  font-weight: 300;
  margin: 2em 0;
}

  
</style>