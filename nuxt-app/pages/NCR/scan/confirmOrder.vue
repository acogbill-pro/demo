<script setup>
import { useRoute } from 'vue-router'
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const route = useRoute()

definePageMeta({
    layout: "ncr",
})

useHead({
    title: 'Shop - Order Confirm'
})

onMounted(() => {
    analytics.page('Order Confirmation')
})
</script>

<template>
    <v-container class="ma-25">
        <h3>Order Confirmed</h3>
        <ul>
            <li>{{ route.query.quantity }} items</li>
            <li>Order Total: ${{ route.query.value }}</li>
        </ul>
        <v-btn block to="/NCR/scan" nuxt>Scan More</v-btn>
    </v-container>
</template>

<style lang="scss" scoped></style>