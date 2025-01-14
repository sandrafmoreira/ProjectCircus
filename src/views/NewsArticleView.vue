<template>

  <div style="display: flex; margin: 100px 0 0;">
    <button>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="50" width="50" height="50" rx="25" transform="rotate(-90 0 50)" fill="#E63946"/>
      <path d="M36.6668 25L13.3335 25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.9997 36.6665L13.333 24.9998L24.9997 13.3332" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <p>Destaques / O circo sustentável</p>
  </div>
  


  <div class="article-container">

    <h1>{{ getArticle.title }} </h1>
    <img :src="getArticle.src" alt="Article image">
    <p>{{ getArticle.text }} </p>
  </div>
</template>

<script>
    import { useNewsStore } from '@/stores/news'

    export default {
        
        computed: {
            getArticle() {
                const newsStore = useNewsStore();
                const id = this.$route.params.id
                const article = newsStore.articles.find(article => article.id == id)
                
                return article
            }
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
