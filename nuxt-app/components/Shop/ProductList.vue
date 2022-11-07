<script setup>
import { useProductCatalog } from '~/stores/products.js'
import { useCartStore } from '~/stores/cart';
const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    category: {
        type: String,
        default: 'Sleep',
    }
})

function titleCase(string) {
    return string !== null ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ''
}

const categoryToPrint = computed(() => {
    return titleCase(props.category)
})

const productsToShow = computed(() => products.all.filter(product => product.category === props.category && product !== cart.recommendedProduct))

const reachedTheEnd = ref(false)


function onIntersect(isIntersecting, entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if (isIntersecting && !reachedTheEnd.value && entries[0].intersectionRatio >= 0.5) {
        reachedTheEnd.value = true
        console.log('Viewed all products in ' + props.category)
    }
}


</script>

<template>
    <div>
        <h1 color="primary" class="my-10">{{ categoryToPrint }}</h1>
        <ShopProductCard v-for="product in productsToShow" :key="product.SKU" :product="product" />
        <v-spacer v-intersect="{
            handler: onIntersect,
            options: {
                threshold: [0, 0.5, 1.0]
            }
        }">
        </v-spacer>
    </div>
</template>

<style lang="scss" scoped>

</style>