<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Confirm Item Add'
})

onMounted(() => {
    analytics.page('Confirm Item Add')
})
</script>

<template>
    <pristineItemConfirmation :sku="sku" />
</template>

<style lang="scss" scoped></style>