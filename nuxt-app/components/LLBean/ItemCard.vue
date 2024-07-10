<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const profiles = useProfileTraitsStore()

const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    sku: {
        type: String,
        default: '0001',
    },
})

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading' })
const productImage = computed(() => '/llbean/images/products/' + product.value.image)

const emit = defineEmits(['andThen'])

function addToCart() {
    // cart.add(product.value.SKU, 1)
    emit('andThen', props.sku)
}

function addReview() {
    reviewOverlay.value = true
}

const reviewOverlay = ref(false)
const highlight = computed(() => profiles.hasSpecificTrait('most_frequent_sub_category') && profiles.getSpecificTrait('most_frequent_sub_category') == product.value.subCategory)
</script>

<template>
    <v-card :class="highlight ? 'mb-10 ml-5 bg-orange-lighten-4' : 'mb-10 ml-5'">
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            <v-img :src="productImage" width="300" />
            {{ product.description }} - SKU: {{ product.SKU }}
        </v-card-text>
        <v-card-actions>
            <v-btn @click="addToCart">View Item</v-btn>
            <v-spacer />
            <v-btn icon="mdi-comment" @click="addReview"></v-btn>
            <v-overlay v-model="reviewOverlay" location-strategy="static" class="align-center justify-center">
                <SharedTrackFormsProductEvent :product="product" v-on:and-then="reviewOverlay = false" />
            </v-overlay>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>