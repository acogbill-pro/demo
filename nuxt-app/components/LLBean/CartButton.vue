<script setup>
import { useCartStore } from '~/stores/cart';
import { useAnalytics } from '~/stores/analytics';

const analytics = useAnalytics()
const cart = useCartStore()

onMounted(() => {
})
</script>

<template>
    <v-btn rounded to="/llbean/products/cart" nuxt color="#0B5640">
        <v-icon icon="mdi-cart" /> {{ cart.totalQuantity }} - ${{ cart.totalValue }}
    </v-btn>
</template>

<style lang="scss" scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>