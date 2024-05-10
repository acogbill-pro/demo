<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const products = useProductCatalog()

const props = defineProps({
    sku: {
        type: String,
        default: '0000',
    },
})

// const { SKU } = route.query || '0001'

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading', image: 'bananas.jpg' })
const productImage = computed(() => '/cw/images/products/' + product.value.image)

const progress = ref([0])
const checkboxOptions = ref([0, 25, 50, 75, 100])

function boxChecked(option, index) {
    analytics.track('Video Progress', { video: product.value, amount: option })
    if (option === 100) analytics.track('Video End', { video: product.value })
}

function play() {
    if (props.sku === '0000') return
    console.log('playin')
}

onMounted(() => analytics.track('Video Start', { video: product.value }))
</script>

<template>
    <v-card>
        <!-- <v-card-title class="text-h5">{{ product.name }}</v-card-title> -->
        <v-card-text>
            <v-img :src="productImage" width="300" />
            <span class="text-body-1">{{ product.description }}</span>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn icon="mdi-arrow-left" to="/cw/products"></v-btn>
            <v-checkbox v-for="(option, index) in checkboxOptions" v-model="progress" :label="`${option}%`"
                :value="option" :disabled="progress.includes(option)" class="ma-0"
                @update:model-value="boxChecked(option, index)" />
            <v-btn icon="mdi-play" @click="play"></v-btn>
            <v-spacer />
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>