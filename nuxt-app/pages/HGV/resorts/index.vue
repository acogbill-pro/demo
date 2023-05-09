<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "hgv",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Resorts & Destinations'
})

onMounted(() => {
    analytics.page('Resorts & Destinations')

    //profiles.startSyncing(3)
})
</script>

<template>
    <v-container no-gutters>
        <v-row no-gutters>
            <v-col>
                <v-img src="/HGV/images/resortsSplash.png" grow />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-img src="/HGV/images/resortsBlurb.png" grow />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-img src="/HGV/images/resortsFeature.png" grow />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <HGVTabbedSearch />
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>