<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "hack25",
})

useHead({
    title: 'Shop - Checkout'
})

onMounted(() => {
    analytics.page('Checkout Start')
    analytics.track('Checkout Started', cart.asSummaryObject)
})
</script>

<template>
    <div>
        <Hack25Checkout />
    </div>
</template>

<style lang="scss" scoped></style>