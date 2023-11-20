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

// const name = ref('')
const fname = ref('')
const lname = ref('')
const email = ref('')
const zip = ref('')
const birthMonth = ref(null)

function submit() {
    if (birthMonth.value === null) return
    const payload = { fname: fname.value, lname: lname.value, email: email.value, zip: zip.value, birthMonth: birthMonth.value }
    // const payload = JSON.parse(JSON.stringify(payloadRef))
    console.log(payload)

    analytics.identify(payload)

    navigateTo({
        path: '/purina/foodfinder/confirm',
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
            <v-col><v-text-field v-model="fname" label="First Name" solo /></v-col>
        </v-row>
        <v-row>
            <v-col><v-text-field v-model="lname" label="Last Name" solo /></v-col>
        </v-row>
        <v-row>
            <v-col><v-text-field v-model="email" label="Email" solo /></v-col>
        </v-row>
        <v-row>
            <v-col><v-text-field v-model="zip" label="Zip Code" solo /></v-col>
        </v-row>
        <v-row>
            <v-select v-model="birthMonth" label="Month of Birth" :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                variant="solo"></v-select>
        </v-row>

    </v-container>
    <v-btn @click="submit" block color="#0C7978">Continue</v-btn>
</template>

<style lang="scss" scoped></style>