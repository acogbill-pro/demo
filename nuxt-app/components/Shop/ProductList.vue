<script setup>
import { useProductCatalog } from '~/stores/products.js'
const products = useProductCatalog()

const props = defineProps({
    category: {
        type: String,
        default: 'Sleep',
    }
})

const productsToShow = computed(() => products.all.filter(product => product.category === props.category))

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
        <h1 color="primary" class="my-10">{{ props.category }}</h1>
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