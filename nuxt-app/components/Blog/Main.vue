<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <BlogArticleList category="Category 1" />
                <BlogArticleList category="Category 2" />
            </v-col>
            <v-col cols="4">
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