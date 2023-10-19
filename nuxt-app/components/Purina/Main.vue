<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileStore()
products.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Cupid',
            description: 'You will know why we named her Cupid!',
            age: 1,
            species: 'dog',
            subCategory: 'puppy',
            breed: 'Mixed',
            size: 'large',
            location: 'NY',
            image: 'Cupid.jpeg',
            priceUSD: 150
        },
        {
            SKU: '0002',
            name: 'Jason',
            description: 'He just seems like a Jason.',
            age: 0,
            species: 'dog',
            subCategory: 'puppy',
            breed: 'Unknown',
            size: 'medium',
            location: 'PA',
            priceUSD: 400,
            image: 'Jason.jpeg'
        },
        {
            SKU: '0003',
            name: 'Monkey',
            description: 'Worry not, this is not an actual monkey.',
            age: 1,
            species: 'dog',
            subCategory: 'puppy',
            breed: 'Mixed',
            size: 'medium',
            location: 'NJ',
            priceUSD: 200,
            image: 'Monkey.jpeg'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImagePath = computed(() => profile.hasTraits ? '/purina/images/dogsPlaying.jpeg' : '/purina/images/puppyPlaying.jpeg')

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
            <!-- <v-row v-if="profile.hasTraits && profile.traits.order_delivery_date && profile.traits.confirmed_delivery_date">
                <h4>{{ deliveryCopy }}</h4>
            </v-row> -->
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
                    <v-btn block to="/purina/petfinder" nuxt class="my-5">Pet Finder</v-btn>
                    <v-btn block to="/purina/foodfinder" nuxt class="my-5">Food Finder</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>