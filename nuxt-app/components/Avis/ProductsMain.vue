<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Coffee Mate',
            description: 'Coffee mate French Vanilla Flavored Iced Coffee',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 10,
            image: 'coffeeMate.jpg',
        },
        {
            SKU: '0002',
            name: 'Nesquik',
            description: 'Chocolate Flavored Powder 44.9 oz. Canister',
            category: 'powders',
            subCategory: 'bulk',
            priceUSD: 15,
            image: 'nesquik.jpg'
        },
        {
            SKU: '0003',
            name: 'Chocolate Chips',
            description: '1 Bag',
            category: 'baking',
            subCategory: 'chocolate',
            priceUSD: 20,
            image: 'choc_chips.jpg'
        },
        {
            SKU: '0004',
            name: 'Natural Bliss',
            description: 'Original Oat Milk Beverage - 64 oz.',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 20,
            image: 'naturalBliss.jpg'
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