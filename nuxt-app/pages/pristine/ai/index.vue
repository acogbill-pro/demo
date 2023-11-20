<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

definePageMeta({
    layout: "default",
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
        <PristineGenerate />
    </div>
</template>


<style lang="scss" scoped></style>