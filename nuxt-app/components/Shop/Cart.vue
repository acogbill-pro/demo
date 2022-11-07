<script setup>
import { useCartStore } from '~/stores/cart';
import { useAnalytics } from '~/stores/analytics';
import { useProductCatalog } from '~/stores/products';

const analytics = useAnalytics()
const cart = useCartStore()
const products = useProductCatalog()

//const cartQuantity = computed((() => cart.totalQuantity))

const dialog = ref(false)

function viewCart() {
    analytics.page('Cart Viewed')
}

function productFromSKU(withSKU) {
    return products.all.find(product => product.SKU === withSKU)
}
</script>

<template>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
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
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text v-if="cart.totalQuantity > 0">
                <ul>
                    <li v-for="[key, value] in cart.contents.entries()" :key="key">{{ productFromSKU(key).name + ': ' +
                            value
                    }}
                    </li>
                    <li>Quantity: {{ cart.totalQuantity }}</li>
                    <li>Total: ${{ cart.totalValue }}</li>
                </ul>
            </v-card-text>
            <v-card-text v-else>
                Cart is Empty
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<style lang="scss" scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>