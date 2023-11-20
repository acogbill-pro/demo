<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "hgv",
    middleware: ["page-analytics"],
})

useHead({
    title: 'HGV Booking Home'
})

onMounted(() => {
    analytics.page('HGV Booking Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <v-container no-gutters>
        <v-row no-gutters>
            <v-col>
                <HGVPromo />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-img src="/HGV/images/homeNav.png" grow />
            </v-col>
        </v-row>
    </v-container>
</template>


<style lang="scss" scoped></style>