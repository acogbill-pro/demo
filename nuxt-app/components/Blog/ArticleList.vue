<script setup>
import { useArticleCatalog } from '~/stores/articles.js'
const articles = useArticleCatalog()

const props = defineProps({
    category: {
        type: String,
        default: 'Category 1',
    }
})

const articlesToShow = computed(() => articles.all.filter(article => article.category === props.category))

const reachedTheEnd = ref(false)


function onIntersect(isIntersecting, entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if (isIntersecting && !reachedTheEnd.value && entries[0].intersectionRatio >= 0.5) {
        reachedTheEnd.value = true
        console.log('Viewed all articles in Category ' + props.category)
    }
}


</script>

<template>
    <div>
        <h1 color="primary" class="my-10">{{ props.category }}</h1>
        <BlogArticleCard v-for="article in articlesToShow" :key="article.ID" :article="article" />
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