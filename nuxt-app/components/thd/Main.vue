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
            name: 'KitchenAid - 27 cu. ft. French Door Refrigerator',
            description: 'This 26.8 cu. ft. French door refrigerator helps fresh produce stay that way with the ExtendFresh Temperature Management System.',
            category: 'appliance',
            subCategory: 'kitchen',
            brand: 'KitchenAid',
            priceUSD: 3000,
            image: 'fridge.png',
        },
        {
            SKU: '0002',
            name: 'Maytag - 28 in. 4.8 cu. ft. White Top Load Washing Machine',
            description: 'Tackle tough loads with this 4.8 cu. ft. capacity top load washer. The drawer dispenser thoroughly releases detergent throughout the load then the Power Impeller keeps clothes saturated with water and concentrated detergent during the cycle to deliver powerful cleaning.',
            category: 'appliance',
            subCategory: 'laundry',
            brand: 'Maytag',
            priceUSD: 900,
            image: 'washer.png'
        },
        {
            SKU: '0003',
            name: 'Maytag - 7.0 cu. ft. Vented Electric Dryer in White',
            description: 'Let Maytag tackle your large laundry loads in this 7.0 cu. ft. capacity dryer. Dont worry about forgetting to take clothes out of the dryer-the automatic Wrinkle Prevent phase keeps clothes tumbling to help stop wrinkles.',
            category: 'appliance',
            subCategory: 'laundry',
            brand: 'Maytag',
            priceUSD: 750,
            image: 'dryer.png'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImagePath = computed(() => profile.hasTraits ? '/thd/images/appliancesAisle.jpg' : '/thd/images/inStore.jpg')

const deliveryDifference = computed(() => new Date(profile.traits.order_delivery_date) - new Date(profile.traits.confirmed_delivery_date))

const deliveryCopy = computed(() => {
    console.log(deliveryDifference.value, profile.traits.order_delivery_date, profile.traits.confirmed_delivery_date)
    if (deliveryDifference.value > 0) return 'Your delivery will arrive early!'
    if (deliveryDifference.value < 0) return 'Your delivery will arrive late.'
    else return 'Your delivery is on time.'
})

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <v-container>
            <v-row v-if="profile.hasTraits && profile.traits.order_delivery_date && profile.traits.confirmed_delivery_date">
                <h4>{{ deliveryCopy }}</h4>
            </v-row>
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
                    <v-btn block to="/thd/products" nuxt>Add Items</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>