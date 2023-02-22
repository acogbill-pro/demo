<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC POC Main'
})

onMounted(() => {
    analytics.page('KFC Main page')

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
                                to="/shop/products/0006?utm_campaign=Individual&utm_source=Facebook&utm_content=0010&utm_medium=Social"
                                target="_blank" nuxt>
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
                                to="/shop/products/0005?utm_campaign=Family&utm_source=Facebook&utm_content=0005&utm_medium=Social"
                                target="_blank" nuxt>
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