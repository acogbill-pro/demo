<script setup>
import { useArticleCatalog } from '~/stores/articles.js'
import { useAnalytics } from '~/stores/analytics';
const articles = useArticleCatalog()
const analytics = useAnalytics()

const recommendedCategoryLocal = ref(null)
const categoryArrayLocal = ref(Array.from(articles.categories))


onMounted(() => {
    // grab these so the page doesn't rerender with every click, only on Mount
    refreshWithRecommendations()
})

function refreshWithRecommendations() {
    recommendedCategoryLocal.value = articles.recommendedCategory
    categoryArrayLocal.value = Array.from(articles.categoriesWithoutRecommended)
}

const hasRecommendation = computed(() => {
    const isArticle = articles.recommendedArticle instanceof Object
    if (isArticle) {
        //console.log('has reco')
        analytics.track('Article Recommended', articles.recommendedArticle)
    }
    return isArticle
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <v-expand-transition>
                        <div v-if="hasRecommendation">
                            <h1>Recommended in {{ titleCase(articles.recommendedCategory) }}</h1>
                            <BlogArticleCard :article="articles.recommendedArticle" :show-text="false" />
                        </div>
                    </v-expand-transition>
                    <!--<BlogArticleList v-if="hasRecommendation" :category="recommendedCategoryLocal" />-->
                    <BlogArticleList v-for="category in articles.categories" :key="category" :category="category" />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <BlogProfile />
                    <!--Pregnancy Score: {{ articles.categoryScores.get('Pregnancy') }}-->
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped>

</style>