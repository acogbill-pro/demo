<template>
    <v-container>
        <v-row>
            <v-col>
                <AppProductList category='Category 1' />
                <AppProductList category='Category 2' />
            </v-col>
            <v-col>
                <AppIncrement />
            </v-col>
            <v-col>
                <AppProfile />
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