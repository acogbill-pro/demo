<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "thumbtack",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Customer Service View'
})

onMounted(() => {
    analytics.page('POC Service View')

    //profiles.startSyncing(3)
})
</script>

<template>
    <v-container class="bg-gray">
        <v-row class="bg-gray">
            <v-col cols="8">
                <SharedProfileMain />

            </v-col>
            <v-col cols="4">
                <!-- <SharedEventList /> -->
                <SharedProfileUserSummary />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>