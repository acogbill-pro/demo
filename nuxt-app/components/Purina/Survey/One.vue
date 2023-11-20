<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
import { useProfileTraitsStore } from '~~/stores/profileTraits';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()
const profile = useProfileTraitsStore()

const IDforPrint = computed(() => analytics.bestIDIsAnonymous ? 'Anonymous' : analytics.bestID)

const name = ref('')
const isDog = ref(null)

function submit() {
    if (isDog.value === null) return
    const species = isDog.value ? 'dog' : 'cat'
    const payload = { name: name.value, species }
    console.log(payload)
    analytics.track('Owner Confirmed', payload)

    navigateTo({
        path: '/purina/foodfinder/oneFive',
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
                <v-img src="/purina/images/survey/screen1.png" width="800" />
            </v-col>
        </v-row>
        <v-row>
            <v-col><v-text-field v-model="name" label="Name" solo /></v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-radio-group v-model="isDog" inline block>
                    <v-radio label="Cat" :value="false"></v-radio>
                    <v-radio label="Dog" :value="true"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="submit" block>Continue</v-btn>
</template>

<style lang="scss" scoped></style>