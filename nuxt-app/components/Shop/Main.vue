<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()

onMounted(() => {

})

const hasRecommendation = computed(() => {
    const isProduct = cart.recommendedProduct instanceof Object
    if (isProduct) {
        analytics.track('Product Recommended', cart.recommendedProduct)
    }
    return isProduct
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="7">
                    <v-expand-transition>
                        <div v-if="hasRecommendation">
                            <h1>Recommended in {{ titleCase(cart.recommendedCategory) }}</h1>
                            <ShopProductCard :product="cart.recommendedProduct" :show-detail="false" />
                        </div>
                    </v-expand-transition>
                    <ShopProductList v-for="category in products.categories" :key="category" :category="category" />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                    <BlogProfile />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped>

</style>