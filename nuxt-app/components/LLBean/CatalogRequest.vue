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
        <v-card-title>Request Our Latest Catalog</v-card-title>
        <v-card-text>
            <LLBeanFormMain />
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped></style>