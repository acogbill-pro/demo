<script setup>
import { useProductCatalog } from '~~/stores/products';
import { useCartStore } from '~~/stores/cart';
import { useRoute } from 'vue-router'
const products = useProductCatalog()
const cart = useCartStore()

const props = defineProps({
    sku: {
        type: String,
        default: '0000',
    },
})

// const { SKU } = route.query || '0001'
const selectedColor = ref('')

const product = computed(() => products.productFromSKU(props.sku) || { name: 'Loading', image: 'bananas.jpg' })
const productImage = computed(() => '/att/images/products/' + product.value.image)
const productColors = computed(() => product.value.colorWays)

function confirmAdd() {
    if (props.sku === '0000' || selectedColor.value === '') return

    cart.add(product.value.SKU, 1, selectedColor.value)

    navigateTo({
        path: '/att/products/'
    })
}

function removeItem() {
    if (props.sku === '0000') return
    cart.remove(props.sku)

    navigateTo({
        path: '/att/products/'
    })
}
</script>

<template>
    <v-card>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>

            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-img :src="productImage" width="300" />

                    </v-col>
                    <v-col cols="9">
                        <v-form :valid="selectedColor !== ''">
                            <v-radio-group v-model="selectedColor">
                                <template v-slot:label>
                                    <div>Select a color:</div>
                                </template>
                                <ATTSwatch v-for="color in productColors" :key="color" :color="color" />
                            </v-radio-group>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{ product.description }} - SKU: {{ product.SKU }}
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn icon="mdi-cancel" @click="removeItem"></v-btn>
            <v-btn icon="mdi-check" @click="confirmAdd" :disabled="selectedColor === ''"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped></style>