<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

function loadProfile() {
    analytics.identify('Andy_Cogbill_id')
    //profiles.loadProfileForUser('Andy_Cogbill_id')
}
</script>

<template>
    <div>
        <v-btn v-if="!profiles.hasTraits" @click="loadProfile()">Load Profile</v-btn>
        <ul>
            <li v-for="[key, value] in Object.entries(profiles.traits)" :key="key">{{ key + ': ' + value }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>