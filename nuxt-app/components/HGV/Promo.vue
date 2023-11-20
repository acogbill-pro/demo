<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const promoImage = computed(() => {
    return (profiles.hasTraits && (profiles.traits?.likely_young_family)) ? '../HGV/images/promo-family.png' : '../HGV/images/promo.png'
})
</script>

<template>
    <div>
        <v-img :src="promoImage" height="400" class="my-5" />
    </div>
</template>

<style lang="scss" scoped></style>