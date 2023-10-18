<script setup>
import { useRoute } from 'vue-router'
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const route = useRoute()

definePageMeta({
    layout: "thd",
})

useHead({
    title: 'Shop - Order Confirm'
})

function isDate(possibleDate) {
    return !isNaN(Date.parse(possibleDate))
}

const deliverByDate = ref('')

function deliverByChanged(inFocus) {
    // console.log(inFocus, checkInDate.value)
    const formatted = new Date(deliverByDate.value)
    if (!inFocus && isDate(deliverByDate.value)) analytics.track('Confirmed Delivery Date', { Date: formatted })
}

onMounted(() => {
    analytics.page('Order Confirmation')
})
</script>

<template>
    <v-container class="ma-25">
        <v-card>
            <v-card-title>Order Confirmed</v-card-title>
            <v-card-text>
                <ul>
                    <li>{{ route.query.quantity }} items</li>
                    <li>Order Total: ${{ route.query.value }}</li>
                </ul>
                <v-text-field label="Confirm Delivery Date" variant="solo" class="my-5" v-model="deliverByDate"
                    @update:focused="deliverByChanged"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn block to="/thd/products" nuxt>Add More</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<style lang="scss" scoped></style>