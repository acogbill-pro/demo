<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

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
        <CarnivalShopHomeTabs />
    </div>
</template>


<style lang="scss" scoped></style>