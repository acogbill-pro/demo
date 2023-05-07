<script setup>
import { useArticleCatalog } from '~/stores/articles.js'
const articles = useArticleCatalog()

</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <v-expand-transition>
                        <BlogRecommendedArticle v-if="articles.hasRecommendation" />
                    </v-expand-transition>
                    <BlogArticleList v-for="category in articles.categories" :key="category" :category="category" />
                </v-col>
                <v-col cols="5">
                    <SharedSidebar class="mx-5" />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped>

</style>