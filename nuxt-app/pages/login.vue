<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

onMounted(() => {
    analytics.page('Login Page')
})
</script>

<template>
    <LoginRegister />
</template>

<style lang="scss" scoped>

</style>