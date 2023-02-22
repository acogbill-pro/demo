<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "kfc",
    middleware: ["page-analytics"],
})

useHead({
    title: 'KFC In-Store Wifi'
})

onMounted(() => {
    analytics.page('Family Campaign Landing Page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        Family Campaign Landing Page
    </div>
</template>

<style lang="scss" scoped></style>