<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

function loadProfile() {
    profiles.loadProfileForUser('Andy_Cogbill_id')
}

function resetProfile() {
    analytics.reset()
}
</script>

<template>
    <div>
        <v-btn @click="loadProfile()" class="mb-5">Load Profile</v-btn>
        <v-btn @click="resetProfile()" class="mb-5">Reset Profile</v-btn>
        <ul>
            <li v-for="[key, value] in Object.entries(profiles.traits)" :key="key">{{ key + ': ' + value }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>