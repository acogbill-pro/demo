<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Apple iPhone 15 Pro',
            description: 'iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
            category: 'phone',
            subCategory: 'flagship',
            brand: 'Apple',
            priceUSD: 400,
            image: 'iphone15.png',
        },
        {
            SKU: '0002',
            name: 'GooglePixel 8 Pro',
            description: 'Introducing Pixel 8 Pro, the all-pro phone engineered by Google. Its sleek and sophisticated, with powerful performance, an all-day battery, and the best Pixel Camera yet. And with Google AI, you can do more, even faster.',
            category: 'phone',
            subCategory: 'flagship',
            brand: 'Google',
            priceUSD: 350,
            image: 'pixel8.png'
        },
        {
            SKU: '0003',
            name: 'Motorola razr+',
            description: 'The ultra-modern, ultra-pocketable motorola razr+ bends over backwards to do things never before possible. With the largest external display of any flip phone, you can view more at a glance—and do more with it.',
            category: 'phone',
            subCategory: 'folding',
            brand: 'Motorola',
            priceUSD: 250,
            image: 'razr.png'
        },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/att/products/confirmItem',
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
                    <ATTItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU" @and-then="afterAdd" />
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