<template>
  <div>
    {{ getArticle.text }} 🤡
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

</style>
