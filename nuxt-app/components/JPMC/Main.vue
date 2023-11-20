<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileTraitsStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileTraitsStore()
// products.loadProducts(
//     [
//         {
//             SKU: '0001',
//             name: 'Bananas',
//             description: '1 Bunch - per Pound',
//             category: 'produce',
//             priceUSD: 10,
//             image: 'bananas.jpg',
//         },
//         {
//             SKU: '0002',
//             name: 'Plantains',
//             description: '1 Bunch - per Pound',
//             category: 'produce',
//             priceUSD: 15,
//             image: 'plantains.jpg'
//         },
//         {
//             SKU: '0003',
//             name: 'Chocolate Chips',
//             description: '1 Bag',
//             category: 'baking',
//             priceUSD: 20,
//             image: 'choc_chips.jpg'
//         },
//     ]
// )

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImagePath = computed(() => profile.hasTraits ? '/jpmc/images/bread.png' : '/jpmc/images/grocery.jpg')

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
                        <!-- <v-img :src="heroImagePath" width="800" /> -->
                    </v-fade-transition>
                    <!-- Logged in as {{ IDforPrint }} -->
                    <v-expand-transition>
                        <!-- <BrandedShopRecommendedProduct v-if="hasRecommendation" :product="cart.recommendedProduct" /> -->
                    </v-expand-transition>
                    <JPMCAddTransaction />
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>