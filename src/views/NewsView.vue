
<template>

    <section class="main-section-news" >
        <div class="header">
        <img src="/src/assets/NewsView/Leao.png" alt="">
        <div class="newsletter-content" >
            <img class="header-img" src="/src/assets/NewsView/Header.png" alt="">
            <div class="section-text">
                <h1 class="section-title">Subscreve a nossa Newsletter</h1> 
                <p class="section-desc">Queres ser dos primeiros a conhecer as pré-vendas, experiências únicas, <br>ofertas e muito mais? Cria conta no nosso website agora e recebe <br>diretamente na tua caixa de entrada!</p>
            </div>
        </div>        
    </div>

        <div class="articles-content">
            <h2 class="section-subtitle">Últimos Artigos</h2>
            <ul>
                <li v-for="article in newsStore.articles" :key="article.id">
                    <img :src="article.src" alt="">
                    <div class="article">
                        <h3>{{ article.title }}</h3>
                        <p>{{ article.text }}</p>
                        <router-link :to="{name: 'article', params: {id: article.id}}">Detalhes</router-link>
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
    .header {
        display: flex;
        justify-content: space-between;
    }

    .header-img {
        right: 0;
    }

    .articles {
        width: 500px;
    }
</style>