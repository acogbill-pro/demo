<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileTraitsStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileTraitsStore()

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

// const name = ref('')
const genderFlag = ref(null)

function submit() {
    if (genderFlag.value === null) return
    const gender = genderFlag.value ? 'female' : 'male'
    const payload = { gender }
    console.log(payload)
    analytics.track('Owner Confirmed', payload)

    navigateTo({
        path: '/purina/foodfinder/three',
        // query: {
        //     quantity,
        //     value
        // }
    })
}

onMounted(() => {
    // name.value = 'Rover'
    // isDog.value = true
})

const hasRecommendation = computed(() => cart.recommendedProduct instanceof Object)
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-img src="/purina/images/survey/screen2.png" width="800" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-radio-group v-model="genderFlag" inline block>
                    <v-radio label="Male" :value="false"></v-radio>
                    <v-radio label="Female" :value="true"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="submit" block>Continue</v-btn>
</template>

<style lang="scss" scoped></style>