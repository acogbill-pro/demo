<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "foodfinder",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Adoption Home'
})

onMounted(() => {
    analytics.page('Food Finder: Step One')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <PurinaSurveyOne />
    </div>
</template>


<style lang="scss" scoped></style>