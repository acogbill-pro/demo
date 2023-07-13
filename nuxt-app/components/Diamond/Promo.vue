<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

const promoImage = computed(() => {
    return (profiles.hasTraits) ? '/diamond/images/promoOrlando.png' : '/diamond/images/promoGeneral.png'
})
</script>

<template>
    <div>
        <v-img :src="promoImage" height="400" class="my-5" />
    </div>
</template>

<style lang="scss" scoped></style>