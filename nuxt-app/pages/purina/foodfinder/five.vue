<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "foodfinder",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Adoption Home'
})

onMounted(() => {
    analytics.page('Adoption Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <PurinaSurveyFive />
    </div>
</template>


<style lang="scss" scoped></style>