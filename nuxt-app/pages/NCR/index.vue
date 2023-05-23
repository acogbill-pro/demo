<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()
const products = useProductCatalog()

definePageMeta({
    layout: "ncr",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Landing Page'
})

onMounted(() => {
    analytics.page('POC Home')

    products.loadProducts(
        [
            {
                SKU: '0001',
                name: 'Bananas',
                description: '1 Bunch - per Pound',
                category: 'produce',
                priceUSD: 10,
                image: 'bananas.jpg',
            },
            {
                SKU: '0002',
                name: 'Plantains',
                description: '1 Bunch - per Pound',
                category: 'produce',
                priceUSD: 15,
                image: 'plantains.jpg'
            },
        ]
    )

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <NCRMain />
    </div>
</template>


<style lang="scss" scoped></style>