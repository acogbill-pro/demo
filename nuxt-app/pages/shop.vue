<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Products'
})

onMounted(() => {
    analytics.page('Product Listing Page')
})
</script>

<template>
    <ShopMain />
</template>

<style lang="scss" scoped>

</style>