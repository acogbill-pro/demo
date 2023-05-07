<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "carnival",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Booking Home'
})

onMounted(() => {
    analytics.page('Booking Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <CarnivalShopMain />
    </div>
</template>


<style lang="scss" scoped></style>