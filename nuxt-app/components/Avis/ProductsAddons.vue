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
        {
            SKU: '0011',
            name: 'Cover The Car (LDW)',
            description: 'With LDW, avoid paying for damage to our vehicle with no additional out of pocket expense & no increase to your personal policy due to an incident.',
            category: 'add-ons',
            subCategory: 'protections',
            priceUSD: 33,
            image: 'searchBg.png',
        },
        {
            SKU: '0012',
            name: 'Cover My Liability (ALI) ',
            description: 'ALI protects you from any claims that others may make against you, as a result of an accident. Subject to policy limits.',
            category: 'add-ons',
            subCategory: 'protections',
            priceUSD: 16,
            image: 'searchBg.png'
        },
        {
            SKU: '0013',
            name: 'Additional Driver (ADR)',
            description: 'Each driver must be 25 or older and show a valid drivers license at the rental counter. (Oh, and no additional fee for qualifying family members.)',
            category: 'add-ons',
            subCategory: 'extras',
            priceUSD: 13,
            image: 'searchBg.png'
        },
        {
            SKU: '0014',
            name: 'e-Toll Unlimited',
            description: 'e-Toll Unlimited covers all electronic tolls during your rental. No need to worry about having exact change or being stuck in toll plazas. With e-Toll Unlimited, you can use the cashless tolls and just keep moving.',
            category: 'add-ons',
            subCategory: 'extras',
            priceUSD: 12,
            image: 'searchBg.png'
        },
    ]
)

const productsToDisplay = computed(() => products.slice(1).slice(-4))

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
                    <AvisItemCard v-for="product in productsToDisplay" :key="product.SKU" :sku="product.SKU"
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