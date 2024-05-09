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
            name: 'Tom Segura - Completely Normal',
            description: 'Tom Segura shares a few off-hand appraisals on hotels and hobbies with a cool and thoughtful demeanor.',
            category: 'standup',
            priceUSD: 10,
            image: 'segura.jpg',
        },
        {
            SKU: '0002',
            name: 'Bob Saget - Zero to Sixty',
            description: 'Bob Saget declares himself the last TV father viewers can trust in his hour of stories and songs.',
            category: 'standup',
            priceUSD: 15,
            image: 'bob.jpeg'
        },
        {
            SKU: '0003',
            name: 'Running Wilde',
            description: 'Steve Wilde has never performed a selfless act. But why should he - he\'s rich!',
            category: 'comedy',
            priceUSD: 20,
            image: 'wilde.jpg'
        },
        {
            SKU: '0004',
            name: 'The Bernie Mac Show',
            description: 'Comedian Bernie Mac becomes the guardian of his sister\'s three children, only to realize how much constant attention and love they need.',
            category: 'comedy',
            priceUSD: 20,
            image: 'bernie.jpg'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    if (profileTraits.hasSpecificTrait('personalized_hero_image')) return profileTraits.traits.personalized_hero_image
    return profileTraits.hasTraits ? '/cw/images/bread.png' : '/cw/images/grocery.jpg'
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
    const generatedPhoto = await profile.fetchPersonalizedImage(`Image that appears to be taken from a movie in customer's favorite genre or category. If no favorite, use science fiction as the category.`)
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
        <v-container>
            <v-row>
                <v-col cols="8">
                    <v-fade-transition>
                        <v-img :src="heroImagePath" width="800" />
                    </v-fade-transition>
                    <!-- Logged in as {{ IDforPrint }} -->
                    <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                        class="mt-2" @click="loadPhoto">Load Personalized Hero
                        <template v-slot:prepend>
                            <v-icon icon="mdi-image" />
                        </template>
                        <template v-slot:append>
                            <v-icon icon="mdi-refresh" v-if="keepLoading" />
                        </template>
                    </v-btn>
                    <!-- <BrandedShopProductList v-for="category in products.categories" :key="category" :category="category" /> -->
                    <v-btn block to="/cw/products" nuxt class="mt-2">View Titles</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>