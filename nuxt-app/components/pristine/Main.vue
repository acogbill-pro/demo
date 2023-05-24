<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="12">
                    Logged in as {{ IDforPrint }}
                    <v-expand-transition>
                        <!-- <BrandedShopRecommendedProduct v-if="hasRecommendation" :product="cart.recommendedProduct" /> -->
                    </v-expand-transition>
                    <!-- <BrandedShopProductList v-for="category in products.categories" :key="category" :category="category" /> -->
                    <v-btn block to="/pristine/products" nuxt>Add Items</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>        </v-container>
        </v-no-ssr>
</template>

<style lang="scss" scoped></style>