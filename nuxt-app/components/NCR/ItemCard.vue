<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    sku: {
        type: String,
        default: '0001',
    },
})

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading' })
const productImage = computed(() => '/NCR/images/products/' + product.value.image)

const emit = defineEmits(['andThen'])

function addToCart() {
    cart.add(product.value.SKU, 1)
    emit('andThen')
}
</script>

<template>
    <v-card>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            <v-img :src="productImage" width="200" />
            {{ product.description }}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="addToCart">Scan Item</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>