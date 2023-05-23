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
    <div>
        <ul>
            <li v-for="[key, value] in cart.contents.entries()" :key="key">{{ productFromSKU(key).name + ': ' +
                    value
            }}
            </li>
            <li>Quantity: {{ cart.totalQuantity }}</li>
            <li>Total: ${{ cart.totalValue }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>