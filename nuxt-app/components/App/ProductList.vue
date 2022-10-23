<script setup>
import { useProductCatalog } from '~/stores/products.js'
const products = useProductCatalog()

//1const linkText = computed(() => profile.hasTraits ? 'Account' : 'Login')

const reachedTheEnd = ref(false)


function onIntersect(isIntersecting, entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    if (isIntersecting && !reachedTheEnd.value && entries[0].intersectionRatio >= 0.5) {
        reachedTheEnd.value = true
        console.log('reached the end')
    }
}


</script>

<template>
    <div>
        <v-card v-for="product in products.all" :key="product.SKU">
            <v-card-title>{{product.name}}</v-card-title>
            <v-card-text>
                {{product.description}}
            </v-card-text>
            <v-card-actions>
                <v-btn>
                    <v-icon icon="mdi-plus"></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card v-intersect="{
              handler: onIntersect,
              options: {
                threshold: [0, 0.5, 1.0]
              }
        }">
            <v-card-title>The End</v-card-title>

        </v-card>
    </div>
</template>

<style lang="scss" scoped>

</style>