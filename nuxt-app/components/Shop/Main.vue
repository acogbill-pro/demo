<template>
    <v-container>
        <v-row>
            <v-col>
                <ShopProductList category='Category 1' />
                <ShopProductList category='Category 2' />
            </v-col>

            <v-col>
                <BlogProfile />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
</script>

<style lang="scss" scoped>

</style>