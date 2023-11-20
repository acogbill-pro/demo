<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
import { useProductCatalog } from '~~/stores/products';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()
const products = useProductCatalog()

const route = useRoute()
const baseSlug = route.params.slug[0]
const campaign = baseSlug
const product = products.productFromSKU(route.query.utm_product ?? '0001')

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC Campaign landing Page: ' + campaign
})

function afterAddToCart() {
    navigateTo({
        path: '/shop/cart',
        query: {
            product: JSON.stringify(product),
        }
    })
}

onMounted(() => {
    analytics.page('Campaign Landing Page', { campaign })
})
</script>

<template>
    <div>
        <h1>Campaign Landing Page: {{ campaign }}</h1>
        <ShopProductDetail :product="product" @and-then="afterAddToCart" />
    </div>
</template>

<style lang="scss" scoped></style>