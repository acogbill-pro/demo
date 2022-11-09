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

const hasRecommendation = computed(() => articles.recommendedArticle instanceof Object)

</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <v-expand-transition>
                        <BlogRecommendedArticle v-if="hasRecommendation" :article="articles.recommendedArticle" />
                    </v-expand-transition>
                    <!--<BlogArticleList v-if="hasRecommendation" :category="recommendedCategoryLocal" />-->
                    <BlogArticleList v-for="category in articles.categories" :key="category" :category="category" />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <SharedProfile />
                    <SharedEventList />
                    <!--Pregnancy Score: {{ articles.categoryScores.get('Pregnancy') }}-->
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped>

</style>