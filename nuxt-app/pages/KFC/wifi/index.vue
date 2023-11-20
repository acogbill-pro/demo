<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC In-Store Wifi'
})

onMounted(() => {
    analytics.page('Wifi Main page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <WifiMain />
    </div>
</template>

<style lang="scss" scoped></style>