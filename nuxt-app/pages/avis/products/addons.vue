<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()


definePageMeta({
    layout: "avis",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Add-ons'
})

onMounted(() => {
    analytics.page('Product List: Add-ons')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <AvisProductsAddons />
    </div>
</template>


<style lang="scss" scoped></style>