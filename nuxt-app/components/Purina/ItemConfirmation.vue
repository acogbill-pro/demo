<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useRoute } from 'vue-router'
const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    sku: {
        type: String,
        default: '0000',
    },
})

// const { SKU } = route.query || '0001'

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading', image: 'bananas.jpg' })
const productImage = computed(() => '/purina/images/products/' + product.value.image)

function removeItem() {
    if (props.sku === '0000') return
    cart.remove(props.sku)

    navigateTo({
        path: '/purina/petfinder/'
    })
}
</script>

<template>
    <v-card>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            <v-img :src="productImage" width="300" />
            {{ product.description }} - SKU: {{ product.SKU }}
        </v-card-text>
        <v-card-actions>
            <v-btn icon="mdi-cancel" @click="removeItem"></v-btn>
            <v-btn icon="mdi-check" to="/purina/petfinder"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>