<script setup>
import { useCartStore } from '~/stores/cart';
import { useProductCatalog } from '~/stores/products';
const cart = useCartStore()
const products = useProductCatalog()

function productFromSKU(withSKU) {
    return products.all.find(product => product.SKU === withSKU)
}
</script>

<template>
    <v-card>
        <v-card-title>Shopping Cart</v-card-title>
        <v-card-text>
            <ul>
                <li v-for="[key, value] in cart.contents.entries()" :key="key">{{ productFromSKU(key).name + ': ' +
                    value
                }}
                </li>
                <li>Quantity: {{ cart.totalQuantity }}</li>
                <li>Total: ${{ cart.totalValue }}</li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped></style>