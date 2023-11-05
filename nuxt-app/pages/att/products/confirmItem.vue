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
    <v-container>
        <v-row>
            <v-col cols="12">
                <ATTItemConfirmation :sku="SKU" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>