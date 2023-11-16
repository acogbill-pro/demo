<script setup>
import { useCartStore } from '~/stores/cart';
import { useAnalytics } from '~/stores/analytics';

const analytics = useAnalytics()
const cart = useCartStore()

onMounted(() => {
})
</script>

<template>
    <v-btn rounded to="/jpmc/products/cart" nuxt color="white">
        <v-icon icon="mdi-cart" /> {{ cart.totalQuantity }} - ${{ cart.totalValue }}
    </v-btn>
</template>

<style lang="scss" scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>