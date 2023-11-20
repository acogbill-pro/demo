<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "default",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Landing Page'
})

onMounted(() => {
    // analytics.page('Booking Home')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        pristine Landing
    </div>
</template>


<style lang="scss" scoped></style>