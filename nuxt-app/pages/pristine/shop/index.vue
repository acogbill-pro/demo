<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Shop'
})

onMounted(() => {
    analytics.page('Product Listing Page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <BrandedShopMain />
    </div>
</template>

<style lang="scss" scoped></style>