<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
import { useProductCatalog } from '~~/stores/products';
const analytics = useAnalytics()
const profiles = useProfileStore()
const products = useProductCatalog()

const promotedProduct = products.productFromSKU('0006')

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC In-Store Wifi'
})

onMounted(() => {
    analytics.page('Individual Campaign Landing Page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <ShopProductCard :product="promotedProduct" />
</template>

<style lang="scss" scoped></style>