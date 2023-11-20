<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "diamond",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Diamond Resorts & Destinations'
})

onMounted(() => {
    analytics.page('Diamond Resorts & Destinations')

    //profiles.startSyncing(3)
})
</script>

<template>
    <DiamondMain />
    <DiamondBeachBody />
    <!-- <v-container no-gutters>
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
    </v-container> -->
</template>


<style lang="scss" scoped></style>