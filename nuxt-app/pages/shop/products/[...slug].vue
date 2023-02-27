<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useAnalytics } from '~~/stores/analytics';
const products = useProductCatalog()
const analytics = useAnalytics()
const route = useRoute()
const baseSlug = route.params.slug[0]

const productToShow = computed(() => {
    return products.productFromSKU(baseSlug)
})

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Shop - Product Detail: ' + productToShow.value.name
})

function afterAddToCart() {
    navigateTo({
        path: '/shop/cart',
        query: {
            product: baseSlug,
        }
    })
}

onMounted(() => {
    analytics.page('Product Detail: ' + productToShow.value.name)

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <ShopProductDetail :product="productToShow" @and-then="afterAddToCart" />
    </div>
</template>

<style lang="scss" scoped></style>