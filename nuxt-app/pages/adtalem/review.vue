<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProductCatalog } from '~~/stores/products';
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "adtalem",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Review Page'
})

onMounted(() => {
    // analytics.page('POC Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <AdtalemReviewMain />
            </v-col>
            <v-col cols="1" />
            <v-col>
                <SharedProfileConsent />
            </v-col>


        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>