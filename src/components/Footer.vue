<template>

    <footer class="footer">
        <div class="footer-content">
            <div class="newsletter-content">
                <h2> 
                    Subscrever
                </h2>
                <p>
                    Inscreva-se na nossa newsletter e seja o primeiro a saber sobre espetáculos, promoções e surpresas incríveis. <br> Junte-se ou espetáculo!
                </p>
                <div>
                    
                    <input type="email" placeholder="E-mail" class="form-input">
                    <button>
                        <v-icon  class="arrowIcon">
                            mdi-arrow-right
                        </v-icon>
                    </button>
        
                </div>
                
            </div>

            <div  class="middle-content">
                <div class="footer-links">

                    <div class="footer-column">
                        <h3>Circo</h3>
                        <ul>
                        <li><RouterLink :to="{name: 'about'}">Quem somos</RouterLink> </li>
                        <li> <RouterLink :to="{name: 'contacts'}">Contactos</RouterLink></li>
                        <li><RouterLink :to="{name: 'gallery'}">Galeria</RouterLink></li>
                        <li><RouterLink :to="{name: 'activities'}">Espetáculos</RouterLink></li>
                        <li><RouterLink :to="{name: 'news'}">Notícias</RouterLink></li>

                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3>Comprar</h3>
                        <ul>
                        <li><RouterLink :to="{name: 'pricing'}">Bilhetes</RouterLink></li>
                        <li><RouterLink :to="{name: 'giftshop'}">Produtos</RouterLink></li>
                        <li><RouterLink :to="{name: 'pricing'}">Workshops</RouterLink></li> 
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3>Info</h3>
                        <ul>
                        <li><RouterLink :to="{name: 'pricing'}">Horário</RouterLink></li>
                        <li> <RouterLink :to="{name: 'contacts'}">Localização</RouterLink></li>
                        <li> <RouterLink :to="{name: 'contacts'}">FAQs</RouterLink></li>
                        <li><RouterLink :to="{name: 'home'}">Mapa</RouterLink></li>
                        </ul>
                    </div>


                </div>
                <div class="partner">
                    <img src="/src/assets/footer_Img/partners.svg" alt="Parceiros">
                </div>
                <div class="logo">
                    
                    <RouterLink :to="{name: 'home'}"><svg width="287" height="287" viewBox="0 0 287 287" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M277.691 161.592C214.709 161.592 161.897 106.483 147.258 61.4515V41.7935C160.159 27.8286 173.042 46.6555 185.912 32.6906C173.038 40.5869 160.154 15.6826 147.258 23.5744V21.0674C149.193 19.986 150.488 18.0867 150.488 15.9105C150.488 12.5366 147.418 9.80615 143.629 9.80615C139.83 9.80615 136.76 12.5366 136.76 15.906C136.76 18.1404 138.123 20.0709 140.139 21.1344V61.0225C125.696 106.135 72.7411 161.592 9.56641 161.592C9.56641 170.878 19.0893 178.555 31.5258 179.967L9.56641 277.931H46.094L61.2564 165.028C61.5469 163.911 61.7212 162.763 61.7212 161.587C106.444 161.587 134.763 83.8399 141.859 61.9162H143.49C141.962 131.235 113.778 161.587 113.778 161.587H61.7212C61.7212 171.879 73.3936 180.222 87.7963 180.222C102.199 180.222 113.867 171.879 113.867 161.587L109.434 227.613C87.0456 254.6 77.7148 255.864 77.7148 255.864C85.1866 277.931 96.1306 277.931 96.1306 277.931C120.123 277.931 143.522 180.226 143.522 180.217L143.28 180.588L143.562 179.998L143.772 180.423C144.818 184.74 167.671 277.931 191.118 277.931C191.118 277.931 202.062 277.931 209.534 255.864C209.534 255.864 200.208 254.6 177.819 227.622L173.391 161.592C173.391 171.883 185.05 180.226 199.453 180.226C213.855 180.226 225.532 171.883 225.532 161.592H173.48C173.48 161.592 145.3 131.24 143.776 61.9207H145.407C152.504 83.8399 180.809 161.592 225.532 161.592C225.532 162.767 225.706 163.915 226.001 165.033L241.164 277.931H277.691L255.723 179.967C268.168 178.555 277.691 170.878 277.691 161.592Z" fill="white" fill-opacity="0.5"/>
                    </svg></RouterLink>
                    
                </div>
            </div>

            <div class="social-content">
                <div class="social-media-links">
                    
                    <img src="/src/assets/footer_Img/f7_logo-instagram.svg" alt="instagram icon">
                    <img src="/src/assets/footer_Img/simple-icons_youtube.svg" alt="youtube icon">
                    
                </div>
                <span>
                    2024 @TsiwCircus
                </span>
            </div>
        </div>
    </footer>
   
</template>

<script>

    export default {
        name: 'Footer',

    }
</script>

<style lang="scss" scoped>
    .footer {
        background-image: url('/src/assets/footer_Img/grafic_el_footer.svg');
        // position: relative;
        color: white;
        padding: 100px 0 0 0;
        text-align: left;
        background-size: cover; 

    }

    

    /* Conteúdo Geral */
.footer-content {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
    margin: 0;
    padding: 6rem 5rem 2rem ;
    
}

/* Seção da Newsletter */
.newsletter-content {
    width: 35%;
  position: relative;  
    margin-bottom: 20px;
    
}

.newsletter-content h2 {
    font-size: 35px;
    margin-bottom: 10px;
}

.newsletter-content p {
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.newsletter-content input {
    font-size: 16px; 
    box-sizing: border-box;
}

.newsletter-content button {
    border-radius: 50px;
    height: 22%;
    aspect-ratio: 1;
    transform: translateY(0%);
    position: absolute;
    right: 0;
    background-color:var(--color-red-btn); 
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

/* secção do meio que contem os parceiros, logo e links */
.middle-content {
    display: grid;
    grid-template-columns: 35% 35% 22%;
    justify-content: space-between;
    width: 100%;
    align-items: end;
    margin-bottom: 40px;
    gap: 4%;
}

.middle-content .partner img,
.middle-content .logo img {
    width: 100%;
    object-fit: cover;
}

.partner{
    margin-right: 5rem;
}

.footer-links{
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10%; 
  
}

.footer-column h3{
    margin-bottom: 10px;
    font-family: var( --font-Lexend);
    font-weight: 500;
}

.middle-content .footer-links ul {
    list-style-type:none;
    padding: 0;
    font-weight: 300;
    
}

.footer-column li{
    margin-bottom: 5px;
}

.middle-content .footer-links a{
    color: white;
    text-decoration: none;
    font-size: 16px;
    width: 100%;
}

    /* redes sociais */
.social-content {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}

.social-media-links {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    gap: 1rem;
}

.social-media-links img{
    cursor: pointer;
}

.social-content span {
    display: block;
    margin-top: 20px;
    font-size: 14px;
}

</style>

