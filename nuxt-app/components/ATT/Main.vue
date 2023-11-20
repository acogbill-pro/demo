<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileTraitsStore } from '~~/stores/profileTraits';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileTraitsStore()
products.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Apple iPhone 15 Pro',
            description: 'iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
            category: 'phone',
            subCategory: 'flagship',
            colorWays: ['black', 'silver', 'green', 'blue'],
            brand: 'Apple',
            priceUSD: 400,
            image: 'iphone15.png',
        },
        {
            SKU: '0002',
            name: 'GooglePixel 8 Pro',
            description: 'Introducing Pixel 8 Pro, the all-pro phone engineered by Google. Its sleek and sophisticated, with powerful performance, an all-day battery, and the best Pixel Camera yet. And with Google AI, you can do more, even faster.',
            category: 'phone',
            subCategory: 'flagship',
            colorWays: ['black', 'silver', 'green', 'blue'],
            brand: 'Google',
            priceUSD: 350,
            image: 'pixel8.png'
        },
        {
            SKU: '0003',
            name: 'Motorola razr+',
            description: 'The ultra-modern, ultra-pocketable motorola razr+ bends over backwards to do things never before possible. With the largest external display of any flip phone, you can view more at a glance—and do more with it.',
            category: 'phone',
            subCategory: 'folding',
            colorWays: ['black', 'silver'],
            brand: 'Motorola',
            priceUSD: 250,
            image: 'razr.png'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImagePath = computed(() => profile.hasTraits ? '/att/images/iPhonePromo.jpeg' : '/att/images/inStore.png')

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <v-fade-transition>
                        <v-img :src="heroImagePath" width="800" />
                    </v-fade-transition>
                    <!-- Logged in as {{ IDforPrint }} -->
                    <v-expand-transition>
                        <!-- <BrandedShopRecommendedProduct v-if="hasRecommendation" :product="cart.recommendedProduct" /> -->
                    </v-expand-transition>
                    <!-- <BrandedShopProductList v-for="category in products.categories" :key="category" :category="category" /> -->
                    <v-btn block to="/att/products" nuxt>Add Items</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>