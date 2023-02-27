<script setup>
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
})

const emit = defineEmits(['andThen'])

</script>

<template>
    <v-card>
        <v-card-title>Ad Campaign Landing Page: {{ product.category }} Campaign</v-card-title>
        <v-card-text>
            <ShopProductCard :product="props.product" @and-then="emit('andThen')" />
        </v-card-text>

    </v-card>
</template>



<style lang="scss" scoped></style>