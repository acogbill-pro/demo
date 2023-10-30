<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()


definePageMeta({
    layout: "att",
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
        <ATTProductsMain />
    </div>
</template>


<style lang="scss" scoped></style>