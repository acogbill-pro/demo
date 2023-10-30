<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

const route = useRoute()
const { SKU } = route.query || '0001'

definePageMeta({
    layout: "att",
})

useHead({
    title: 'Confirm Item Add'
})

onMounted(() => {
    analytics.page('Confirm Item Add')
})
</script>

<template>
    <ATTItemConfirmation :sku="SKU" />
</template>

<style lang="scss" scoped></style>