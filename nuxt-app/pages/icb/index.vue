<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "icb",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Landing Page'
})

onMounted(() => {
    analytics.page('POC Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <ICBMain />
    </div>
</template>


<style lang="scss" scoped></style>