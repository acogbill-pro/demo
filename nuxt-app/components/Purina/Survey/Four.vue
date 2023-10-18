<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileStore()

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

// const name = ref('')
const ageSelection = ref(null)

function submit() {
    if (ageSelection.value === null) return
    const age = ageSelection.value
    const payload = { age }
    console.log(payload)
    analytics.track('Owner Confirmed', payload)

    navigateTo({
        path: '/purina/foodfinder/five',
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
        <!-- <v-row>
            <v-col><v-text-field v-model="name" label="Name" solo /></v-col>
        </v-row> -->
        <v-row>
            <v-col>
                <v-select v-model="ageSelection" label="Select Age" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                    variant="solo"></v-select>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="submit" block>Continue</v-btn>
</template>

<style lang="scss" scoped></style>