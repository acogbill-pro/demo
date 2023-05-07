<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "carnival",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Browse Bookings'
})

onMounted(() => {
    analytics.page('Browse Bookings')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        Carnival shop
    </div>
</template>

<style lang="scss" scoped></style>