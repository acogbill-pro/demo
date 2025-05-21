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
            name: 'Bananas',
            description: '1 Bunch - per Pound',
            category: 'produce',
            priceUSD: 10,
            image: 'bananas.jpg',
        },
        {
            SKU: '0002',
            name: 'Plantains',
            description: '1 Bunch - per Pound',
            category: 'produce',
            priceUSD: 15,
            image: 'plantains.jpg'
        },
        {
            SKU: '0003',
            name: 'Chocolate Chips',
            description: '1 Bag',
            category: 'baking',
            priceUSD: 20,
            image: 'choc_chips.jpg'
        },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

// const heroImageOverrideURL = ref(null)
// const heroImagePath = computed(() => {
//     if (heroImageOverrideURL.value) return heroImageOverrideURL.value
//     if (profileTraits.hasSpecificTrait('personalized_hero_image')) return profileTraits.traits.personalized_hero_image
//     return profileTraits.hasTraits ? '/cr/images/memberHome.jpeg' : '/cr/images/memberHome.jpeg'
// })

const slug = computed(() => profileTraits.personalizationCategory.toLowerCase())
const imageUrl = computed(() => `url("/cr/images/heroes/${slug.value}.png")`)

const imageLoading = ref(false)
const keepLoading = ref(false)

// async function loadPhoto() {
//     if (keepLoading.value) {
//         keepLoading.value = false
//         return
//     }
//     imageLoading.value = true
//     keepLoading.value = true
//     const generatedPhoto = await profile.fetchPersonalizedImage('Image of a person happily admiring themselves in the clothes they like most')
//     // console.log('gen photo URL', generatedPhoto)
//     if (generatedPhoto !== '') {
//         heroImageOverrideURL.value = generatedPhoto
//         analytics.identify({ 'personalized_hero_image': generatedPhoto })
//     }
//     imageLoading.value = false


//     setTimeout(() => {
//         if (keepLoading.value) {
//             keepLoading.value = false
//             return
//         }
//         loadPhoto()
//     }, 5000)
// }

onMounted(() => {

})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-no-ssr>
        <div class="notPersonalized" v-if="!profileTraits.hasTraits">
            <v-container>
                <v-row>

                    <v-col cols="8">
                        <!-- <v-container height="600" /> -->
                        <!-- <v-fade-transition>
                        <v-img :src="heroImagePath" width="800" />
                    </v-fade-transition> -->
                        <!-- <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                            class="mt-2" @click="loadPhoto">Load Personalized Hero
                            <template v-slot:prepend>
                                <v-icon icon="mdi-image" />
                            </template>
<template v-slot:append>
                                <v-icon icon="mdi-refresh" v-if="keepLoading" />
                            </template>
</v-btn> -->
                        <!-- <v-btn block to="/cr/products" nuxt class="mt-2">Shop Items</v-btn> -->
                    </v-col>
                    <v-col cols="4">
                        <SharedSidebar />
                    </v-col>
                </v-row>
                <!-- <v-row class="mt-10">
                    <v-col>
                        <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                            class="mt-2" @click="loadPhoto">Load Personalized Hero
                            <template v-slot:prepend>
                                <v-icon icon="mdi-image" />
                            </template>
                            <template v-slot:append>
                                <v-icon icon="mdi-refresh" v-if="keepLoading" />
                            </template>
                        </v-btn>
                        <BrandedShopProductList v-for="category in products.categories" :key="category" :category="category" />
                        <v-btn block to="/pristine/products" nuxt class="mt-2">Shop Items</v-btn>
                    </v-col>
                </v-row> -->
            </v-container>
        </div>
        <div v-else class="personalized" :style="{ 'background-image': imageUrl }">
            <v-container>
                <v-row class="pt-4">
                    <h3 v-if="profileTraits.hasSpecificTrait('member_since')" class="text-white">Member since {{
                        profileTraits.getSpecificTrait('member_since') }}</h3>
                </v-row><v-row>
                    <h1 class="text-white">Welcome, {{ profileTraits.hasSpecificTrait('first_name') ?
                        profileTraits.getSpecificTrait('first_name') : 'Member' }}</h1>
                </v-row>
                <v-row>

                    <v-col cols="8">
                        <!-- <v-container height="600" /> -->
                        <!-- <v-fade-transition>
                        <v-img :src="heroImagePath" width="800" />
                    </v-fade-transition> -->
                        <!-- <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                            class="mt-2" @click="loadPhoto">Load Personalized Hero
                            <template v-slot:prepend>
                                <v-icon icon="mdi-image" />
                            </template>
                            <template v-slot:append>
                                <v-icon icon="mdi-refresh" v-if="keepLoading" />
                            </template>
                        </v-btn> -->
                        <!-- <v-btn block to="/cr/products" nuxt class="mt-2">Shop Items</v-btn> -->
                    </v-col>
                    <v-col cols="4">
                        <SharedSidebar />
                    </v-col>
                </v-row>
                <!-- <v-row class="mt-10">
                    <v-col>
                        <v-btn v-if="profile.hasLoaded" :loading="imageLoading" :disabled="imageLoading" block nuxt
                            class="mt-2" @click="loadPhoto">Load Personalized Hero
                            <template v-slot:prepend>
                                <v-icon icon="mdi-image" />
                            </template>
                            <template v-slot:append>
                                <v-icon icon="mdi-refresh" v-if="keepLoading" />
                            </template>
                        </v-btn>
                        <BrandedShopProductList v-for="category in products.categories" :key="category" :category="category" />
                        <v-btn block to="/pristine/products" nuxt class="mt-2">Shop Items</v-btn>
                    </v-col>
                </v-row> -->
            </v-container>
        </div>
    </v-no-ssr>
</template>

<style lang="scss" scoped>
.personalized {
    // background: url('../cr/images/memberHome.jpeg');
    background-size: 100%;
    background-color: #0b0b0e;
    // height: 100vh;
    height: 600px;
    background-position-x: 0;
    background-position-y: 0;
    background-repeat: no-repeat;
}

.notPersonalized {
    background: url('../cr/images/welcome.png');
    background-size: 600px;
    background-color: #0b0b0e;
    // height: 100vh;
    height: 600px;
    background-position-x: 10%;
    background-position-y: 10%;
    background-repeat: no-repeat;
}
</style>