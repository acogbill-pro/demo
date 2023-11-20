<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "ncr",
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
        <NCRMain />
    </div>
</template>


<style lang="scss" scoped></style>