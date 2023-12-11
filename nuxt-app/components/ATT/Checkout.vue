<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()

function isDate(possibleDate) {
    return !isNaN(Date.parse(possibleDate))
}

const deliverByDate = ref('')

function deliverByChanged(inFocus) {
    // console.log(inFocus, checkInDate.value)
    const formatted = new Date(deliverByDate.value)
    if (!inFocus && isDate(deliverByDate.value)) analytics.track('Deliver By Date', { Date: formatted })
}

async function submitOrder() {

    const response = await cart.submitOrder()
    // console.log('passing as query', response)
    navigateTo({
        path: '/att/products/confirmOrder',
        query: response
    })

}

onMounted(() => {
})
</script>

<template>
    <div v-if="!analytics.bestIDIsAnonymous">
        <v-container>
            <v-row v-if="!analytics.bestIDIsAnonymous">
                <v-col cols="5">
                    <ATTCartContents />

                </v-col>
                <v-col cols="3"></v-col>
                <v-col cols="4">
                    <SharedEventList />
                </v-col>
            </v-row><v-row>
                <v-col cols="4">
                    <v-text-field label="Deliver By Date" variant="solo" v-model="deliverByDate"
                        @update:focused="deliverByChanged"></v-text-field>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn @click="submitOrder()">Complete Purchase</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-row>
                <v-col>
                    <UserLogin />
                </v-col>
                <v-col>
                    <UserRegister />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped></style>