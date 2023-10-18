<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "purina",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Landing Page'
})

onMounted(() => {
    analytics.page('Purina Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <PurinaMain />
    </div>
</template>


<style lang="scss" scoped></style>