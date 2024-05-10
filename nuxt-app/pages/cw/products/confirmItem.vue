<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const cart = useCartStore()

const route = useRoute()
const { SKU } = route.query || '0001'

definePageMeta({
    layout: "cw",
})

useHead({
    title: 'Title Detail'
})

onMounted(() => {
    analytics.page('Title Detail')
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col>

            </v-col>
            <v-col cols="8">
                <CWItemConfirmation :sku="SKU" />
            </v-col>
            <v-col>

            </v-col>
        </v-row>
    </v-container>

</template>

<style lang="scss" scoped></style>