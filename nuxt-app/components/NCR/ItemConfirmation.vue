<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useRoute } from 'vue-router'
const products = useProductCatalog()
const cart = useCartStore()
const route = useRoute()

const { SKU } = route.query || '0001'

const product = computed(() => products.productFromSKU(SKU) || { name: 'Loading', image: 'bananas.jpg' })
const productImage = computed(() => '/NCR/images/products/' + product.value.image)
</script>

<template>
    <v-card>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            <v-img :src="productImage" width="300" />
            {{ product.description }} - SKU: {{ product.SKU }}
        </v-card-text>
        <v-card-actions>
            <v-btn icon="mdi-cancel"></v-btn>
            <v-btn icon="mdi-check" to="/NCR/scan"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>