<template>
    <v-container>
        <v-row>
            <v-col>
                <AppProductList />
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