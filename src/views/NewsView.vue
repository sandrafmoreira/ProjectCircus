
<template>
    <div>
        <h1>News Page 📰</h1> 
        <ul>
            <li v-for="article in newsStore.articles" :key="article.id">
                <router-link :to="{name: 'article', params: {id: article.id}}">{{ article.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { useNewsStore } from '@/stores/news'

    export default {
        data() {
            return {
                newsStore: useNewsStore()
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>