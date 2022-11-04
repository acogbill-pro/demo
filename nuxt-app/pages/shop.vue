<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "shop",
})

useHead({
    title: 'Products'
})

onMounted(() => {
    analytics.page('Product Listing Page')
    profiles.persistUser()
})
</script>

<template>
    <ShopMain />
</template>

<style lang="scss" scoped>

</style>