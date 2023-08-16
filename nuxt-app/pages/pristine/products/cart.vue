<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Shop - Checkout'
})

onMounted(() => {
    analytics.page('Cart Page')
    analytics.track('Viewed Cart', cart.asSummaryObject)
})
</script>

<template>
    <v-card>
        <!-- <v-card-title>Shopping Cart</v-card-title> -->

        <v-card-text v-if="cart.totalQuantity > 0">
            <PristineCartContents />
        </v-card-text>
        <v-card-text v-else>
            Cart is Empty
        </v-card-text>
        <v-card-actions>
            <v-btn to="/pristine/products" nuxt>Continue Shopping</v-btn>
            <v-btn to="/pristine/products/checkout" nuxt>Checkout</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>