<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <v-expand-transition>
                        <ShopRecommendedProduct v-if="hasRecommendation" :product="cart.recommendedProduct" />
                    </v-expand-transition>
                    <ShopProductList v-for="category in products.categories" :key="category" :category="category" />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped>

</style>