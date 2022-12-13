<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const route = useRoute()

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Shop'
})

onMounted(() => {
    analytics.page('Product Listing Page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <ShopMain />
    </div>
</template>

<style lang="scss" scoped>

</style>