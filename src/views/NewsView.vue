
<template>

    <section class="main-section-news" >
        <div class="header">
        <img src="/src/assets/NewsView/Leao.png" alt="">
        <div class="newsletter-content" >
            <img class="header-img" src="/src/assets/NewsView/Header.png" alt="">
            <section>
                <h1>Subscreve a nossa Newsletter</h1> 
                <p>Queres ser dos primeiros a conhecer as pré-vendas, experiências únicas, <br>ofertas e muito mais? Cria conta no nosso website agora e recebe <br>diretamente na tua caixa de entrada!</p>
            </section>
        </div>        
    </div>

        <h2 style="margin-left: 300px; margin-bottom: 30px; font-size: 32px;">Últimos Artigos</h2>
        <div class="articles">
            <ul>
                <li v-for="article in newsStore.articles" :key="article.id">
                    <img :src="article.src" alt="">
                    <div>
                        <h4>{{ article.title }}</h4>
                        <p>{{ article.text }}</p>
                        <router-link :to="{name: 'article', params: {id: article.id}}" class="link">Detalhes</router-link>
                    </div>
                </li>
            </ul>
        </div>

       
    </section>
  
    <Footer></Footer>
    
</template>

<script>
    import { useNewsStore } from '@/stores/news'
    import Footer from '@/components/Footer.vue';
    export default {
        components:{
            Footer,
        },
        data() {
            return {
                newsStore: useNewsStore()
            }
        },
    }
</script>

<style lang="scss" scoped>
    body {
        display: flex;
        justify-content: center;  
        align-items: center;     
    }

    .articles {
        width: 55%;
        display: flex;
        flex-direction: column;  
        align-items: center;     
        justify-content: center; 
        margin: 0 auto;        
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .header-img {
        right: 0;
    }

    li {
        margin-bottom: 40px;
        display: flex;
    }

    li > img {
        border-radius: 10px;
        width: 300px;
    }

    div > h4, div > p {
        padding: 0 0 10px 20px;
        font-size: 16px;
    }

    .link {
        background-color: #E63946;
        color: white;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 300;
        padding: 8px 12px;
        margin: 10px 0 0 20px;
        text-decoration: none;
    }
</style>