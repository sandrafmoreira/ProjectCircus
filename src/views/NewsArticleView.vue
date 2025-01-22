<template>

  <div style="display: flex; margin: 100px 0 0;">
    <button @click="back">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="50" width="50" height="50" rx="25" transform="rotate(-90 0 50)" fill="#E63946"/>
      <path d="M36.6668 25L13.3335 25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.9997 36.6665L13.333 24.9998L24.9997 13.3332" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <p>Destaques / {{ getArticle.title }}</p>
  </div>
  


  <div class="article-container">
    <img :src="getArticle.src" alt="Article image">
    <div>
      <h2>{{ getArticle.author }}</h2>
      <h2>{{ getArticle.date }}</h2>
    </div>
    <h1>{{ getArticle.title }} </h1>
    <p>{{ getArticle.text }} </p>
  </div>
  <Footer></Footer>
</template>

<script>
    import { useNewsStore } from '@/stores/news'
    import Footer from '@/components/Footer.vue';
    export default {
        components:{
          Footer,
        },
        computed: {
            getArticle() {
                const newsStore = useNewsStore();
                const id = this.$route.params.id
                const article = newsStore.articles.find(article => article.id == id)
                
                return article
            }
        },

        methods: {
          back() {
                /**
                 * Voltar para a página das Notícias
                 */
                this.$router.push({name: 'news'})
            },
        },
  }
</script>

<style lang="scss" scoped>

  .article-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center; 
      width: 50vw;
      margin: auto;
  }

  h1 {
    margin-bottom: 20px;
    align-self: flex-start;
  }

  img {
    margin-bottom: 20px;
    width: 100%;
  }
</style>
