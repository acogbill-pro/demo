<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Home'
})

onMounted(() => {
    //analytics.page('Main page')
})
</script>

<template>
    <div>
        <AppMain />
    </div>
</template>

<style lang="scss" scoped>

</style>