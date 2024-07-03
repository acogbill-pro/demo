<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Rubber Mocs',
            description: 'Mens Bean Boots, Rubber Moc',
            category: 'boots',
            subCategory: 'slip-on',
            gender: 'men',
            priceUSD: 75,
            image: 'rubberMoc.jpeg',
        },
        {
            SKU: '0002',
            name: 'Womens Trail Model Rain Jacket',
            description: 'Our bestselling rain jacket keeps you dry when you need it and packs down small when you dont. The ideal everyday favorite to never leave behind.',
            category: 'outerwear',
            subCategory: 'jackets',
            gender: 'women',
            priceUSD: 150,
            image: 'jacket.jpeg'
        },
        {
            SKU: '0003',
            name: 'L.L.Bean Ridge Runner Pack, 26L',
            description: 'The perfect-size pack for carrying all your necessities on day hikes. Its built with lightweight, ultra-durable materials that wont weigh you down whether youre hiking your favorite peak or heading into town.',
            category: 'bags & travel',
            subCategory: 'hiking backpacks',
            priceUSD: 119,
            image: 'ridgeRunner.jpeg'
        },
        {
            SKU: '0004',
            name: 'Indoor/Outdoor Vacationland Rug, Dog Canoe',
            description: 'Instantly enhance any doorway -- indoors or out -- with this vibrant rug, featuring a fun handhooked dog motif. Found only at L.L.Bean.',
            category: 'coffee',
            subCategory: 'creamers',
            priceUSD: 50,
            image: 'doormat.jpeg'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/llbean/products/confirmItem',
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
                    <LLBeanItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
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