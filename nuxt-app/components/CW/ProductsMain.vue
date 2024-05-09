<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Tom Segura - Completely Normal',
            description: 'Tom Segura shares a few off-hand appraisals on hotels and hobbies with a cool and thoughtful demeanor.',
            category: 'standup',
            priceUSD: 10,
            image: 'segura.jpg',
        },
        {
            SKU: '0002',
            name: 'Bob Saget - Zero to Sixty',
            description: 'Bob Saget declares himself the last TV father viewers can trust in his hour of stories and songs.',
            category: 'standup',
            priceUSD: 15,
            image: 'bob.jpeg'
        },
        {
            SKU: '0003',
            name: 'Running Wilde',
            description: 'Steve Wilde has never performed a selfless act. But why should he - he\'s rich!',
            category: 'comedy',
            priceUSD: 20,
            image: 'wilde.jpg'
        },
        {
            SKU: '0004',
            name: 'The Bernie Mac Show',
            description: 'Comedian Bernie Mac becomes the guardian of his sister\'s three children, only to realize how much constant attention and love they need.',
            category: 'comedy',
            priceUSD: 20,
            image: 'bernie.jpg'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/cw/products/confirmItem',
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
                    <CWItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
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