<script setup>
import { useProfiles } from '~/stores/profiles.js'
const profiles = useProfiles()

function loadProfile() {
    profiles.loadProfileForUser('Andy_Cogbill_id')
}
</script>

<template>
    <div>
        <v-btn @click="loadProfile()">Load Profile</v-btn>
        <ul>
            <li v-for="[key,value] in Object.entries(profiles.traits)" :key="key">{{value}}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>