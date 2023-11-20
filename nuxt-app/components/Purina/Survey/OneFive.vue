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
const size = ref(null)

function submit() {
    if (size.value === null) return
    // const gender = genderFlag.value ? 'female' : 'male'
    const payload = { size: size.value }
    console.log(payload)
    analytics.track('Owner Confirmed', payload)

    navigateTo({
        path: '/purina/foodfinder/two',
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
                <v-img src="/purina/images/survey/screen15.png" width="800" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-radio-group v-model="size" inline block>
                    <v-radio label="Toy" value="toy"></v-radio>
                    <v-radio label="Small" value="small"></v-radio>
                    <v-radio label="Medium" value="medium"></v-radio>
                    <v-radio label="Large" value="large"></v-radio>
                    <v-radio label="Giant" value="giant"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="submit" block>Continue</v-btn>
</template>

<style lang="scss" scoped></style>