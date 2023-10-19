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
    analytics.page('Food Finder: Save Result')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <PurinaSurveySave />
    </div>
</template>


<style lang="scss" scoped></style>