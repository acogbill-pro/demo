<script setup>
import { useProductCatalog } from '~/stores/products.js'
import { useCartStore } from '~/stores/cart';
import { useProfileStore } from '~/stores/profiles';
const products = useProductCatalog()
const cart = useCartStore()
const profiles = useProfileStore()

const props = defineProps({
    product: {
        type: Object,
        default: {
            SKU: '0001',
            name: 'Loading',
            description: 'Loading',
            category: 'Loading',
            priceUSD: 1,
        },
    },
    showDetail: {
        type: Boolean,
        default: true,
    }
})

const localizedPrice = computed(() => '$' + props.product.priceUSD) // TODO: Localize currency

function addToCart() {
    cart.add(props.product.SKU, 1)
}

const ownsProduct = computed(() => {
    return profiles.productSKUsOwned.includes(props.product.SKU)
})
</script>

<template>
    <v-card class="mb-10">
        <v-card-title>{{ props.product.name }}
            <v-icon icon="mdi-check-circle" v-if="ownsProduct" small />
        </v-card-title>
        <v-card-text>
            {{ props.product.description }}
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            {{ localizedPrice }}
            <v-btn @click="addToCart">
                <v-icon icon="mdi-plus"></v-icon>
                <v-icon icon="mdi-cart"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>

</style>