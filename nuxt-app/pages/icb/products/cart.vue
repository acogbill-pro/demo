<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

definePageMeta({
    layout: "icb",
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
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <!-- <v-card-title>Shopping Cart</v-card-title> -->

                    <v-card-text v-if="cart.totalQuantity > 0">
                        <ICBCartContents />
                    </v-card-text>
                    <v-card-text v-else>
                        Cart is Empty
                    </v-card-text>
                    <v-card-actions>
                        <v-btn to="/icb/products" nuxt>Continue Shopping</v-btn>
                        <v-btn to="/icb/products/checkout" nuxt>Checkout</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="3"></v-col>
            <v-col cols="4">
                <SharedEventList />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>