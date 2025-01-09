<template>
  <div>
    {{ getArticle.text }} 
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
  }
</script>

<style lang="scss" scoped>

</style>
