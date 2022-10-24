<script setup>
import { useProductCatalog } from '~/stores/products.js'
const products = useProductCatalog()

const props = defineProps({
    sku: {
        type: String,
        default: '0001',
    }
})

const productToShow = computed(() => products.all.find(product => product.SKU === props.sku))
</script>

<template>
    <v-card class="mb-10">
        <v-card-title>Product {{productToShow.name}}</v-card-title>
        <v-card-text>
            {{productToShow.description}}
        </v-card-text>
        <v-card-actions>
            <v-btn>
                <v-icon icon="mdi-plus"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>

</style>