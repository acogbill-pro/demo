<script setup>
const runtimeConfig = useRuntimeConfig()
const brandName = computed(() => (runtimeConfig.brandedAssetsPath))
useHead({
    title: 'Main'
})
</script>

<template>
    <div>
        Home
    </div>
</template>

<style lang="scss" scoped></style>