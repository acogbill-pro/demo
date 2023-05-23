<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
import { useProductCatalog } from '~~/stores/products';
const analytics = useAnalytics()
const profiles = useProfileStore()
const { all: products } = useProductCatalog()

definePageMeta({
    layout: "ncr",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Scan an Item'
})

onMounted(() => {
    analytics.page('Scanning List')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <div class="items">
                        <NCRItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<style lang="scss" scoped>
.items {
    column-count: 4;
    column-gap: 10px;
    padding: 0 5px;
}
</style>