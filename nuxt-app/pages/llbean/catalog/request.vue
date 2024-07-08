<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profile';
const analytics = useAnalytics()
const profile = useProfileStore()

definePageMeta({
    layout: "llbean",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Request a Catalog'
})

onMounted(() => {
    analytics.page('Request a Catalog')
    //profiles.persistUser()
})
</script>

<template>
    <v-container class="bg-gray">
        <v-row class="bg-gray">
            <v-col cols="8">
                <LLBeanCatalogRequest />
            </v-col>
            <v-col cols="4">
                <!-- <SharedEventList /> -->
                <SharedProfileMain />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>