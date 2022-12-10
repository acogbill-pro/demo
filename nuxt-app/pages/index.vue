<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const route = useRoute()

definePageMeta({
    layout: "default",
})

useHead({
    title: 'Blog'
})

onMounted(() => {
    analytics.page('Main page', route.path)

    console.log(route)

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <BlogMain />
    </div>
</template>

<style lang="scss" scoped>

</style>