<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()


definePageMeta({
    layout: "thumbtack",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Add an Item'
})

onMounted(() => {
    analytics.page('Product List')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <ThumbtackProductsMain />
    </div>
</template>


<style lang="scss" scoped></style>