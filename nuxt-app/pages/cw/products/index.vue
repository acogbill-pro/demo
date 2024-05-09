<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()


definePageMeta({
    layout: "cw",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Add an Item'
})

onMounted(() => {
    analytics.page('Title List')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <CWProductsMain />
    </div>
</template>


<style lang="scss" scoped></style>