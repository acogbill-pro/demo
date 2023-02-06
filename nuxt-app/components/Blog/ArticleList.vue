<script setup>
import { useArticleCatalog } from '~/stores/articles.js'
import { useAnalytics } from '~/stores/analytics'
import { useRecommendations } from '~/stores/recommendations';
const articles = useArticleCatalog()
const analytics = useAnalytics()
const recommendations = useRecommendations()

const props = defineProps({
    category: {
        type: String,
        default: 'Pregnancy',
    }
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}

const categoryToPrint = computed(() => {
    return titleCase(props.category)
})

const articlesToShow = computed(() => articles.all?.filter(article => article.category === props.category && article !== recommendations.recommendedArticle)) ?? []

const reachedTheEnd = ref(false)


function onIntersect(isIntersecting, entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if (isIntersecting && !reachedTheEnd.value && entries[0].intersectionRatio >= 0.5) {
        reachedTheEnd.value = true
        analytics.track('Viewed All Articles in Category', { category: props.category })
    }
}

const client = useSupabaseClient()
const { data: dbarticles } = await useAsyncData('dbarticles', async () => {
    const { data } = await client.from('Articles').select('id, title, fullText, category')
    //console.log(data)
    articles.all = data
    return data
})
onMounted(() => {

})
</script>

<template>
    <div>
        <h1 color="primary" class="my-10">{{ categoryToPrint }}</h1>
        <BlogArticleCard v-for="article in articlesToShow" :key="article.id" :article="article" />
        <v-spacer v-intersect="{
            handler: onIntersect,
            options: {
                threshold: [0, 0.5, 1.0]
            }
        }">
        </v-spacer>
    </div>
</template>

<style lang="scss" scoped>

</style>