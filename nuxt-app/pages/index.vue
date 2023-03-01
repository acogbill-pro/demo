<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
import { useProductCatalog } from '~~/stores/products';
const analytics = useAnalytics()
const profiles = useProfileStore()
const products = useProductCatalog()

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC POC Main'
})

onMounted(() => {
    //analytics.page('KFC Main page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Wi-Fi Landing Page
                        </v-card-title>
                        <v-card-text>
                            <v-img src="../images/cSanders.jpeg" width="300" />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn block to="/wifi" target="_blank" nuxt><v-icon icon="mdi-wifi" block large />Wi-fi Landing
                                Page</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            E-Commerce Shop
                        </v-card-title>
                        <v-card-text>
                            Simulated TicTuk implementation
                        </v-card-text>

                        <v-card-actions>
                            <v-btn block to="/shop" target="_blank" nuxt><v-icon icon="mdi-cart" block
                                    large />KFC.com.mx</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Individual Ad Campaign
                        </v-card-title>
                        <v-card-text>
                            <v-img src="../images/products/0010.png" width="300" />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn block
                                to="/shop/landing/individual?utm_campaign=Individual&utm_source=Facebook&utm_content=0010&utm_medium=Social&utm_product=0010"
                                target="_blank" nuxt
                                @click="analytics.track('Clicked Ad', { campaign: 'Individual', product: products.productFromSKU('0010') })">
                                <v-tooltip key="Individual" activator="parent"
                                    location="bottom"><code>.../shop/landing/individual?utm_campaign=Individual&utm_source=Facebook&utm_content=0010&utm_medium=Social&utm_product=0010</code></v-tooltip>
                                Simulate Click<v-icon icon="mdi-cursor-pointer" />
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Family Ad Campaign
                        </v-card-title>
                        <v-card-text>
                            <v-img src="../images/products/0005.png" width="300" />

                        </v-card-text>

                        <v-card-actions>
                            <v-btn block
                                to="/shop/landing/family?utm_campaign=Family&utm_source=Facebook&utm_content=0005&utm_medium=Social&utm_product=0005"
                                target="_blank" nuxt
                                @click="analytics.track('Clicked Ad', { campaign: 'Family', product: products.productFromSKU('0005') })">
                                <v-tooltip key="Family" activator="parent"
                                    location="bottom"><code>.../shop/landing/family?utm_campaign=Family&utm_source=Facebook&utm_content=0005&utm_medium=Social&utm_product=0005</code></v-tooltip>
                                Simulate Click<v-icon icon="mdi-cursor-pointer" />
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped></style>