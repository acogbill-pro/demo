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
            name: 'Rubber Mocs',
            description: 'Mens Bean Boots, Rubber Moc',
            category: 'boots',
            subCategory: 'slip-on',
            gender: 'men',
            priceUSD: 75,
            image: 'rubberMoc.jpeg',
        },
        {
            SKU: '0002',
            name: 'Womens Trail Model Rain Jacket',
            description: 'Our bestselling rain jacket keeps you dry when you need it and packs down small when you dont. The ideal everyday favorite to never leave behind.',
            category: 'outerwear',
            subCategory: 'jackets',
            gender: 'women',
            priceUSD: 150,
            image: 'jacket.jpeg'
        },
        {
            SKU: '0003',
            name: 'L.L.Bean Ridge Runner Pack, 26L',
            description: 'The perfect-size pack for carrying all your necessities on day hikes. Its built with lightweight, ultra-durable materials that wont weigh you down whether youre hiking your favorite peak or heading into town.',
            category: 'bags & travel',
            subCategory: 'hiking backpacks',
            priceUSD: 119,
            image: 'ridgeRunner.jpeg'
        },
        {
            SKU: '0004',
            name: 'Indoor/Outdoor Vacationland Rug, Dog Canoe',
            description: 'Instantly enhance any doorway -- indoors or out -- with this vibrant rug, featuring a fun handhooked dog motif. Found only at L.L.Bean.',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 50,
            image: 'doormat.jpeg'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    if (profileTraits.hasSpecificTrait('personalized_hero_image')) return profileTraits.traits.personalized_hero_image
    return profileTraits.hasTraits ? '/llbean/images/inStore.jpg' : '/llbean/images/inStore.jpg'
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
    const generatedPhoto = await profile.fetchPersonalizedImage('Image of a happy person standing in front of an outdoor market display of food')
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
    <ClientOnly>
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
                    <v-btn block to="/llbean/products" nuxt class="mt-2">Shop Items</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </ClientOnly>
</template>

<style lang="scss" scoped></style>