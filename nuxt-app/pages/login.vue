<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

onMounted(() => {
    analytics.page('Login')
})
</script>

<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>

</style>