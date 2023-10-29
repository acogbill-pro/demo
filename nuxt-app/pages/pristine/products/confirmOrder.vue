<script setup>
import { useRoute } from 'vue-router'
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const route = useRoute()

const { orderID, quantity, value } = route.query

definePageMeta({
    layout: "default",
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
        <v-card>
            <v-card-title>Order {{ orderID }} Confirmed</v-card-title>
            <v-card-text>
                <ul>
                    <li>{{ quantity }} items</li>
                    <li>Order Total: ${{ value }}</li>
                </ul>
            </v-card-text>
            <v-card-actions>
                <v-btn block to="/pristine/products" nuxt>Add More</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<style lang="scss" scoped></style>