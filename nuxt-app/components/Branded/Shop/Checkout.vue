<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
import { useProductCatalog } from '~/stores/products'
import { useCartStore } from '~/stores/cart';
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()



function submitOrder() {
    const quantity = cart.totalQuantity
    const value = cart.totalValue
    cart.submitOrder()

    navigateTo({
        path: '/shop/confirmOrder',
        query: {
            quantity,
            value
        }
    })
}

onMounted(() => {
})
</script>

<template>
    <v-container>
        <v-row v-if="!analytics.bestIDIsAnonymous">
            <v-col>
                <ShopCartContents />
                <v-btn @click="submitOrder()">Complete Purchase</v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <UserLogin />
            </v-col>
            <v-col>
                <UserRegister />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>

</style>