<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()


definePageMeta({
    layout: "ncr",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Scan an Item'
})

onMounted(() => {
    analytics.page('Scanning List')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <NCRScanningMain />
    </div>
</template>


<style lang="scss" scoped></style>