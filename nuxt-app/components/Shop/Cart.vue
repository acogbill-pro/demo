<script setup>
import { useCartStore } from '~/stores/cart';
import { useAnalytics } from '~/stores/analytics';

const analytics = useAnalytics()
const cart = useCartStore()

//const cartQuantity = computed((() => cart.totalQuantity))

const dialog = ref(false)

function viewCart() {
    analytics.page('Cart Viewed')
    analytics.track('Cart Opened', cart.asSummaryObject)
}

function closeCart() {
    dialog.value = false
    analytics.track('Cart Closed', cart.asSummaryObject)
}

onMounted(() => {
})
</script>

<template>
    <div>Placeholder
        <!--<v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
            <v-btn @click="viewCart" v-bind="props" rounded>
                <v-icon icon="mdi-cart" /> {{ cart.totalQuantity }} - ${{ cart.totalValue }}
            </v-btn>
        </template>
        <v-card>
            <v-toolbar color="#f22f46">

                <v-toolbar-title>Shopping Cart</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn to="/checkout" nuxt @click="closeCart()">Checkout</v-btn>
                    <v-btn icon dark @click="closeCart()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text v-if="cart.totalQuantity > 0">
                <ShopCartContents />
                <v-btn to="/checkout" nuxt @click="closeCart()">Checkout</v-btn>
            </v-card-text>
            <v-card-text v-else>
                Cart is Empty
            </v-card-text>
        </v-card>

    </v-dialog>-->
    </div>
</template>

<style lang="scss" scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>