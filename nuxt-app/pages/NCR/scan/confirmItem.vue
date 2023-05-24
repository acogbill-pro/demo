<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "ncr",
})

useHead({
    title: 'Confirm Item Scan'
})

onMounted(() => {
    analytics.page('Confirm Item Scan')
})
</script>

<template>
    <NCRItemConfirmation :sku="sku" />
</template>

<style lang="scss" scoped></style>