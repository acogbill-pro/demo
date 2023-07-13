<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "diamond",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Diamond Booking Home'
})

onMounted(() => {
    analytics.page('Diamond Booking Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <DiamondMain />
</template>


<style lang="scss" scoped></style>