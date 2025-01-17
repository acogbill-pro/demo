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
            name: 'Coffee Mate',
            description: 'Coffee mate French Vanilla Flavored Iced Coffee',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 10,
            image: 'coffeeMate.jpg',
        },
        {
            SKU: '0002',
            name: 'Nesquik',
            description: 'Chocolate Flavored Powder 44.9 oz. Canister',
            category: 'powders',
            subCategory: 'bulk',
            priceUSD: 15,
            image: 'nesquik.jpg'
        },
        {
            SKU: '0003',
            name: 'Chocolate Chips',
            description: '1 Bag',
            category: 'baking',
            subCategory: 'chocolate',
            priceUSD: 20,
            image: 'choc_chips.jpg'
        },
        {
            SKU: '0004',
            name: 'Natural Bliss',
            description: 'Original Oat Milk Beverage - 64 oz.',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 20,
            image: 'naturalBliss.jpg'
        },
        // {
        //     SKU: '0001',
        //     name: 'Bee Berry Sting Bowl',
        //     description: 'Savor the ripe mango and fresh berries over a pitaya base, topped with a honey drizzle and Purely Elizabeth Granola.',
        //     category: 'Smoothie Bowls',
        //     subCategory: 'berry',
        //     priceUSD: 10,
        //     image: 'bee-berry-sting-bowl-ingredients-final.png',
        // },
        // {
        //     SKU: '0002',
        //     name: 'Gladiator Chocolate',
        //     description: 'Fuel up for it, grab hold of it and show it your strength with the help of this protein-rich Smoothie.',
        //     category: 'Get Fit Blends',
        //     subCategory: 'chocolate',
        //     priceUSD: 15,
        //     image: 'sk-fitness-gladiator-chocolate-with-ingredients.png'
        // },
        // {
        //     SKU: '0003',
        //     name: 'Blueberry Lemonade',
        //     description: 'Filled with tasty, whole ingredients, this Smoothie blends flavor and joy into every moment.',
        //     category: 'Enjoy a Treat Blends',
        //     subCategory: 'berry',
        //     priceUSD: 20,
        //     image: 'blueberry-lemonade-with-ingredients.png'
        // },
        // {
        //     SKU: '0004',
        //     name: 'Choc-A-Laka',
        //     description: 'The other half is knowing this Smoothie will help fuel their future and feed their mind.',
        //     category: 'Kids Blends',
        //     subCategory: 'chocolate',
        //     priceUSD: 20,
        //     image: 'sk-kids-choc-a-laka-with-ingredients.png'
        // },
    ]
)

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    if (profileTraits.hasSpecificTrait('personalized_hero_image')) return profileTraits.traits.personalized_hero_image
    return profileTraits.hasTraits ? '/pristine/images/gifts.svg' : '/pristine/images/gifts.svg'
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
                    <v-btn block to="/pristine/products" nuxt class="mt-2">Shop Items</v-btn>
                </v-col>
                <v-col cols="4">
                    <SharedSidebar />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>