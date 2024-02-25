<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profile';
const analytics = useAnalytics()
const profile = useProfileStore()

definePageMeta({
    layout: "icb",
    middleware: ["page-analytics"],
})

useHead({
    title: 'Account Page'
})

onMounted(() => {
    analytics.page('Account Page')
    //profiles.persistUser()
})
</script>

<template>
    <SharedProfileAccountMain />
</template>

<style lang="scss" scoped></style>