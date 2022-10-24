<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Products'
})

onMounted(() => {
    analytics.page('Product Listing Page')
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <ShopProductList category='Category 1' />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ShopProductList category='Category 2' />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>