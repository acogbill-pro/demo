<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Blog'
})

onMounted(() => {
    analytics.page('Main page')

    profiles.persistUser()
})
</script>

<template>
    <div>
        <BlogMain />
    </div>
</template>

<style lang="scss" scoped>

</style>