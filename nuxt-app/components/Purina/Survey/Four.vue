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
const selected = ref([])

function submit() {
    if (selected.value === null) return
    const payload = { dietary: selected.value }
    console.log(payload)
    analytics.track('Owner Confirmed', payload)

    navigateTo({
        path: '/purina/foodfinder/result',
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
                <v-img src="/purina/images/survey/screen4.png" width="800" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- <v-row>
                    <v-col cols="4">
                        Natural
                    </v-col>
                    <v-col cols="4">
                        Grain-Free
                    </v-col>
                    <v-col cols="4">
                        Organic
                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col cols="4">
                        <v-checkbox v-model="selected" value="natural" label="Natural"></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                        <v-checkbox v-model="selected" value="grain-free" label="Grain-Free"></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                        <v-checkbox v-model="selected" value="organic" label="Organic"></v-checkbox>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-btn @click="submit" block>Continue</v-btn>
</template>

<style lang="scss" scoped></style>