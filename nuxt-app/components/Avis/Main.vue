<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileTraitsStore } from '~~/stores/profileTraits';
import { useProfileStore } from '~/stores/profile';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profileTraits = useProfileTraitsStore()
const profile = useProfileStore()
products.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Luxury',
            description: 'Chrysler 300 or similar',
            category: 'sedan',
            subCategory: 'luxury',
            priceUSD: 1000,
            image: 'product-sedan.png',
        },
        {
            SKU: '0002',
            name: 'Full-Size Pickup Truck',
            description: 'RAM 1500 or similar',
            category: 'truck',
            subCategory: 'full',
            priceUSD: 950,
            image: 'product-pickup.png'
        },
        {
            SKU: '0003',
            name: 'Standard SUV',
            description: 'Ford Edge or similar',
            category: 'suv',
            subCategory: 'full',
            priceUSD: 800,
            image: 'product-suv.png'
        },
        {
            SKU: '0004',
            name: 'Standard Elite Electric',
            description: 'Ford Mustang Mach-E or similar',
            category: 'suv',
            subCategory: 'electric',
            priceUSD: 840,
            image: 'product-electric.png'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    if (profileTraits.hasSpecificTrait('personalized_hero_image')) return profileTraits.traits.personalized_hero_image
    return profileTraits.hasTraits ? '/avis/images/bread.png' : '/avis/images/grocery.jpg'
})

const imageLoading = ref(false)
const keepLoading = ref(false)

async function loadPhoto() {
    if (keepLoading.value) {
        keepLoading.value = false
        return
    }
    imageLoading.value = true
    keepLoading.value = true
    const generatedPhoto = await profile.fetchPersonalizedImage('Image of a happy person unlocking the door to a sporty-looking car')
    // console.log('gen photo URL', generatedPhoto)
    if (generatedPhoto !== '') {
        heroImageOverrideURL.value = generatedPhoto
        analytics.identify({ 'personalized_hero_image': generatedPhoto })
    }
    imageLoading.value = false


    setTimeout(() => {
        if (keepLoading.value) {
            keepLoading.value = false
            return
        }
        loadPhoto()
    }, 5000)
}

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <div class="hero">
            <v-container>
                <v-row>
                    <v-col cols="7">
                        <AvisFormMain />
                        <!-- <v-fade-transition>
                        <v-img :src="heroImagePath" width="800" />
                    </v-fade-transition>
                    <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                        class="mt-2" @click="loadPhoto">Load Personalized Hero
                        <template v-slot:prepend>
                            <v-icon icon="mdi-image" />
                        </template>
<template v-slot:append>
                            <v-icon icon="mdi-refresh" v-if="keepLoading" />
                        </template>
</v-btn>
<v-btn block to="/avis/products" nuxt class="mt-2">Shop Items</v-btn> -->
                    </v-col>
                    <v-col>

                    </v-col>
                    <v-col cols="4">
                        <SharedSidebar />
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-no-ssr>
</template>

<style lang="scss" scoped>
.hero {
    background: url('../avis/images/searchBg.png');
    background-size: cover;
    // height: 100vh;
    height: 400px;
    background-position-x: -130px;
}
</style>