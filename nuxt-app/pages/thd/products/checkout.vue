<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "thd",
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
        <ThdCheckout />
    </div>
</template>

<style lang="scss" scoped></style>