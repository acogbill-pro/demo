<script setup>
import { useProductCatalog } from '~/stores/products.js'
const products = useProductCatalog()

const props = defineProps({
    sku: {
        type: String,
        default: '0001',
    }
})

const product = computed(() => products.all.find(product => product.SKU === props.sku))

const localizedPrice = computed(() => '$' + product.value.priceUSD) // TODO: Localize currency
</script>

<template>
    <v-card class="mb-10">
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
            {{ product.description }}
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            {{ localizedPrice }}
            <v-btn>
                <v-icon icon="mdi-plus"></v-icon>
                <v-icon icon="mdi-cart"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>

</style>