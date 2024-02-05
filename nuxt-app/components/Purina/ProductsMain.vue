<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Cupid',
            description: 'You will know why we named her Cupid!',
            age: 1,
            category: 'dog',
            subCategory: 'puppy',
            breed: 'Mixed',
            size: 'large',
            location: 'NY',
            image: 'Cupid.jpeg',
            priceUSD: 150
        },
        {
            SKU: '0002',
            name: 'Jason',
            description: 'He just seems like a Jason.',
            age: 0,
            category: 'dog',
            subCategory: 'puppy',
            breed: 'Unknown',
            size: 'medium',
            location: 'PA',
            priceUSD: 400,
            image: 'Jason.jpeg'
        },
        {
            SKU: '0003',
            name: 'Monkey',
            description: 'Worry not, this is not an actual monkey.',
            age: 1,
            category: 'dog',
            subCategory: 'puppy',
            breed: 'Mixed',
            size: 'medium',
            priceUSD: 200,
            image: 'Monkey.jpeg'
        },
        {
            SKU: '0004',
            name: 'Luigi',
            description: 'The perfect sidekick.',
            age: 4,
            category: 'dog',
            subCategory: 'young',
            breed: 'Shar Pei',
            size: 'medium',
            priceUSD: 500,
            image: 'luigi.jpg'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/purina/petfinder/confirmItem',
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
                    <PurinaItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
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