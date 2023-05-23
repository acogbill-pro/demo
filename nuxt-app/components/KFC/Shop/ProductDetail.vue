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
    <ShopProductCard :product="props.product" @and-then="emit('andThen')" />
</template>



<style lang="scss" scoped></style>