<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()


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