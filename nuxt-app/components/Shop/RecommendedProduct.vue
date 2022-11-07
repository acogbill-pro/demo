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
</script>

<template>
    <div>
        <h1>Recommended in {{ titleCase(product.category) }}</h1>
        <ShopProductCard :product="props.product" :show-detail="false" />
    </div>
</template>

<style lang="scss" scoped>

</style>