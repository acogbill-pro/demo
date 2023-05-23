<script setup>
import { useAnalytics } from '~/stores/analytics';
const analytics = useAnalytics()

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

onMounted(() => {
    analytics.track('Product Recommended', props.product)
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}

function afterAddToCart() {
    console.log('reco added to cart')
    analytics.track('Product Recommendation Accepted', props.product)
}
</script>

<template>
    <div>
        <h1>Recommended in {{ titleCase(product.category) }}</h1>
        <ShopProductCard :product="props.product" :show-detail="false" @and-then="afterAddToCart" />
    </div>
</template>

<style lang="scss" scoped></style>