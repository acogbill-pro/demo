<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useCartStore } from '~/stores/cart';
import { useProfileStore } from '~~/stores/profile';
// import { useProfileTraitsStore } from '~~/stores/profileTraits';
const analytics = useAnalytics()
const cart = useCartStore()
const profile = useProfileStore()
// const traits = useProfileTraitsStore()

const prompt = ref('')

const heroImageOverrideURL = ref(null)
const heroImagePath = computed(() => {
    if (heroImageOverrideURL.value) return heroImageOverrideURL.value
    return '/hack25/images/grocery.jpg'
})

const imageLoading = ref(false)
const keepLoading = ref(false)

async function loadPhoto() {
    if (keepLoading.value || prompt.value === '') {
        keepLoading.value = false
        return
    }
    imageLoading.value = true
    keepLoading.value = true
    const generatedPhoto = await profile.fetchGenAIImage(prompt.value)
    // console.log('gen photo URL', generatedPhoto)
    if (generatedPhoto !== '') {
        heroImageOverrideURL.value = generatedPhoto
        // analytics.identify({ 'personalized_hero_image': generatedPhoto })
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
                <v-fade-transition>
                    <v-img :src="heroImagePath" width="800" />
                </v-fade-transition>
                <!-- Logged in as {{ IDforPrint }} -->
                <v-textarea v-model="prompt" block auto-grow clearable rows="2" class="my-0 mt-1" />
                <v-btn :loading="imageLoading" :disabled="imageLoading" block nuxt class="mt-0" @click="loadPhoto">Load
                    Image
                    <template v-slot:prepend>
                        <v-icon icon="mdi-image" />
                    </template>
                    <template v-slot:append>
                        <v-icon icon="mdi-refresh" v-if="keepLoading" />
                    </template>
                </v-btn>
                <!-- <v-col cols="8">
                    <v-textarea v-model="prompt"
                </v-col> -->
                <!-- <v-col cols="4">
                    <SharedSidebar />
                </v-col> -->
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<style lang="scss" scoped></style>