<script setup>
import { useAnalytics } from '~/stores/analytics';
import { useArticleCatalog } from '~/stores/articles'
import { useRecommendations } from '~/stores/recommendations';
const analytics = useAnalytics()
const articles = useArticleCatalog()
//const recommendations = useRecommendations()

const props = defineProps({
})

onMounted(() => {
    analytics.track('Article Recommended', props.article)
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}
</script>

<template>
    <div>
        <h1>Recommended in {{ titleCase(articles.recommendedArticle.category) }}</h1>
        <BlogArticleCard :article="articles.recommendedArticle" :show-text="false" />
    </div>
</template>

<style lang="scss" scoped>

</style>