<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
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

function afterScan(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/pristine/products/confirmItem',
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
                    <pristineItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
                        @and-then="afterScan" />
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