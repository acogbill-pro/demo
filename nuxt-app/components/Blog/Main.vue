<template>
    <v-no-ssr>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <BlogArticleList category="Pregnancy" />
                    <BlogArticleList category="Sleep" />
                </v-col>
                <v-col cols="1"></v-col>
                <v-col cols="3">
                    <BlogProfile />
                </v-col>
            </v-row>
        </v-container>
    </v-no-ssr>
</template>

<script setup>
//import { useAnalytics } from '~/stores/analytics.js'
//const analytics = useAnalytics()

</script>

<style lang="scss" scoped>

</style>