<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "att",
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