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
const productImage = computed(() => '/att/images/products/' + product.value.image)

const emit = defineEmits(['andThen'])

function addToCart() {

    emit('andThen', props.sku)
}
</script>

<template>
    <v-card class="mb-10">
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            <v-img :src="productImage" width="300" />
            {{ product.description }} - SKU: {{ product.SKU }}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="addToCart">Add Item</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>