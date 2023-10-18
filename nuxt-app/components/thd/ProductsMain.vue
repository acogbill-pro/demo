<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'KitchenAid - 27 cu. ft. French Door Refrigerator',
            description: 'This 26.8 cu. ft. French door refrigerator helps fresh produce stay that way with the ExtendFresh Temperature Management System.',
            category: 'appliance',
            subCategory: 'kitchen',
            brand: 'KitchenAid',
            priceUSD: 3000,
            image: 'fridge.png',
        },
        {
            SKU: '0002',
            name: 'Maytag - 28 in. 4.8 cu. ft. White Top Load Washing Machine',
            description: 'Tackle tough loads with this 4.8 cu. ft. capacity top load washer. The drawer dispenser thoroughly releases detergent throughout the load then the Power Impeller keeps clothes saturated with water and concentrated detergent during the cycle to deliver powerful cleaning.',
            category: 'appliance',
            subCategory: 'laundry',
            brand: 'Maytag',
            priceUSD: 900,
            image: 'washer.png'
        },
        {
            SKU: '0003',
            name: 'Maytag - 7.0 cu. ft. Vented Electric Dryer in White',
            description: 'Let Maytag tackle your large laundry loads in this 7.0 cu. ft. capacity dryer. Dont worry about forgetting to take clothes out of the dryer-the automatic Wrinkle Prevent phase keeps clothes tumbling to help stop wrinkles.',
            category: 'appliance',
            subCategory: 'laundry',
            brand: 'Maytag',
            priceUSD: 750,
            image: 'dryer.png'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/thd/products/confirmItem',
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
                    <ThdItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU" @and-then="afterAdd" />
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