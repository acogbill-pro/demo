<script setup>
import { useProductCatalog } from '~~/stores/products';
const productCatalog = useProductCatalog()
const { all: products } = productCatalog
productCatalog.loadProducts(
    [
        {
            SKU: '0001',
            name: 'Chicken Shawarma',
            description: 'Delicious.',
            category: 'hot',
            subCategory: 'sandwiches',
            protein: 'chicken',
            priceUSD: 14.99,
            image: 'chicken-shawarma.jpg',
        },
        {
            SKU: '0002',
            name: 'The Chino 2.0',
            description: 'Our signature washed chino, updated for smart performance & maximum versatility.',
            category: 'pants',
            subCategory: 'chinos',
            fit: 'tailored',
            priceUSD: 99,
            image: 'chino.jpg'
        },
        {
            SKU: '0003',
            name: 'Riviera Short Sleeve Shirt',
            description: 'Our best seller for a reason. A few reasons, actually: Original prints, comfy stretch & a better fit.',
            category: 'shirts',
            subCategory: 'casual',
            fit: 'slim',
            priceUSD: 85,
            image: 'casual.jpg'
        },
        {
            SKU: '0004',
            name: 'Jetsetter Premium Dress Shirt',
            description: 'A luxurious dress shirt with premium cotton from one of Portugals most celebrated mills.',
            category: 'shirts',
            subCategory: 'formal',
            fit: 'tailored',
            priceUSD: 179,
            image: 'formal.jpg'
        },
        // {
        //     SKU: '0001',
        //     name: 'Bee Berry Sting Bowl',
        //     description: 'Savor the ripe mango and fresh berries over a pitaya base, topped with a honey drizzle and Purely Elizabeth Granola.',
        //     category: 'Smoothie Bowls',
        //     subCategory: 'berry',
        //     priceUSD: 10,
        //     image: 'bee-berry-sting-bowl-ingredients-final.png',
        // },
        // {
        //     SKU: '0002',
        //     name: 'Gladiator Chocolate',
        //     description: 'Fuel up for it, grab hold of it and show it your strength with the help of this protein-rich Smoothie.',
        //     category: 'Get Fit Blends',
        //     subCategory: 'chocolate',
        //     priceUSD: 15,
        //     image: 'sk-fitness-gladiator-chocolate-with-ingredients.png'
        // },
        // {
        //     SKU: '0003',
        //     name: 'Blueberry Lemonade',
        //     description: 'Filled with tasty, whole ingredients, this Smoothie blends flavor and joy into every moment.',
        //     category: 'Enjoy a Treat Blends',
        //     subCategory: 'berry',
        //     priceUSD: 20,
        //     image: 'blueberry-lemonade-with-ingredients.png'
        // },
        // {
        //     SKU: '0004',
        //     name: 'Choc-A-Laka',
        //     description: 'The other half is knowing this Smoothie will help fuel their future and feed their mind.',
        //     category: 'Kids Blends',
        //     subCategory: 'chocolate',
        //     priceUSD: 20,
        //     image: 'sk-kids-choc-a-laka-with-ingredients.png'
        // },
    ]
)

function afterAdd(SKU) {
    // console.log(SKU)
    navigateTo({
        path: '/hack25/products/confirmItem',
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
                    <Hack25ItemCard v-for="product in products" :key="product.SKU" :sku="product.SKU"
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