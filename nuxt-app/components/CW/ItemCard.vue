<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    sku: {
        type: String,
        default: '0001',
    },
})

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading' })
const productImage = computed(() => '/cw/images/products/' + product.value.image)

const emit = defineEmits(['andThen'])

function addToCart() {
    // cart.add(product.value.SKU, 1)
    analytics.track('Title Loaded', product.value)
    emit('andThen', props.sku)
}

function addReview() {
    reviewOverlay.value = true
}

const reviewOverlay = ref(false)
</script>

<template>
    <v-card class="mb-10">
        <!-- <v-card-title>{{ product.name }}</v-card-title> -->
        <v-card-text>
            <v-img :src="productImage" width="300" class="mb-2" />
            <span class="text-body-1">{{ product.description }}</span>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="addToCart">View Title</v-btn>
            <v-spacer />
            <v-btn icon="mdi-comment" @click="addReview"></v-btn>
            <v-overlay v-model="reviewOverlay" location-strategy="static" class="align-center justify-center">
                <SharedTrackFormsReview :product="product" v-on:and-then="reviewOverlay = false" />
            </v-overlay>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>