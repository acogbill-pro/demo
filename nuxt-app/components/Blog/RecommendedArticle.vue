<script setup>
import { useAnalytics } from '~/stores/analytics';
const analytics = useAnalytics()

const props = defineProps({
    article: {
        type: Object,
        default: { ID: '0001', title: 'Article Loading', fullText: 'Article Loading' }
    },
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
        <h1>Recommended in {{ titleCase(article.category) }}</h1>
        <BlogArticleCard :article="props.article" :show-text="false" />
    </div>
</template>

<style lang="scss" scoped>

</style>