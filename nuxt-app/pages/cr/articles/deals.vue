<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
import { sl } from 'vuetify/locale';

const analytics = useAnalytics()
const { activeSource } = analytics
const profiles = useProfileTraitsStore()

const slug = "deals"
const capital = "Deals"


definePageMeta({
    layout: "cr",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Articles: ' + capital
})

onMounted(() => {
    analytics.page('Articles', {}, capital)


    //profiles.startSyncing(3)
})
</script>

<template>
    <CRBrowseBar />
    <CRArticleSearch :slug="slug" />
</template>


<style lang="scss" scoped></style>