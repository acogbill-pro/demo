<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "att",
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
        <ATTMain />
    </div>
</template>


<style lang="scss" scoped></style>