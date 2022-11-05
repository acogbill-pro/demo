<script setup>
import { useArticleCatalog } from '~/stores/articles.js'
const articles = useArticleCatalog()

const recommendedCategoryLocal = ref(null)
const categoryArrayLocal = ref(articles.categories)


onMounted(() => {
    // grab these so the page doesn't rerender with every click, only on Mount
    recommendedCategoryLocal.value = articles.recommendedCategory
    categoryArrayLocal.value = articles.categoriesWithoutRecommended
})

</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <BlogArticleList v-if="recommendedCategoryLocal !== null" :category="recommendedCategoryLocal" />
                    <BlogArticleList v-for="category in categoryArrayLocal" :key="category" :category="category" />
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