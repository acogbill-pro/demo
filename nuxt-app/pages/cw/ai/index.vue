<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

definePageMeta({
    layout: "cw",
    middleware: ["page-analytics"],
})

useHead({
    title: 'GenAI Page'
})

onMounted(() => {
    analytics.page('Generative AI Page')

    //profiles.startSyncing(3)
})
</script>

<template>
    <div>
        <CWGenerate />
    </div>
</template>


<style lang="scss" scoped></style>