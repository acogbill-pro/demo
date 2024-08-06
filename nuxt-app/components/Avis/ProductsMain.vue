<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Luxury',
            description: 'Chrysler 300 or similar',
            category: 'sedan',
            subCategory: 'luxury',
            priceUSD: 1000,
            image: 'product-sedan.png',
        },
        {
            SKU: '0002',
            name: 'Full-Size Pickup Truck',
            description: 'RAM 1500 or similar',
            category: 'truck',
            subCategory: 'full',
            priceUSD: 950,
            image: 'product-pickup.png'
        },
        {
            SKU: '0003',
            name: 'Standard SUV',
            description: 'Ford Edge or similar',
            category: 'suv',
            subCategory: 'full',
            priceUSD: 800,
            image: 'product-suv.png'
        },
        {
            SKU: '0004',
            name: 'Standard Elite Electric',
            description: 'Ford Mustang Mach-E or similar',
            category: 'suv',
            subCategory: 'electric',
            priceUSD: 840,
            image: 'product-electric.png'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/avis/products/confirmItem',
        query: {
            SKU
        }
    })
}
onMounted(() => {

})
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="items">
                    <AvisItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
                        @and-then="afterAdd" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.items {
    column-count: 2;
    column-gap: 10px;
    padding: 0 5px;
}
</style>