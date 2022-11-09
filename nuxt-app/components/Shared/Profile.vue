<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

function loadProfile() {
    profiles.loadProfileForUser('Andy_Cogbill_id')
}

const profileLoaded = computed(() => {
    return profiles.userID !== null
})

const isSyncing = computed({
    get: () => profiles.isSyncing,
    set: (value) => {
        if (value === true) {
            if (profiles.userID === null) {
                profiles.persistUser()
                //analytics.reset()
                //analytics.identify('Andy_Cogbill_id')
            } else {
                profiles.startSyncing(10)
            }
        } else {
            profiles.stopSyncing()
        }
    }
})

function resetProfile() {
    profiles.unload()
}

</script>

<template>
    <div>
        <h1 class="my-10">
            Profile
        </h1>
        <v-card class="mb-5">
            <v-card-title>
                <v-form ref="form">
                    <v-text-field v-model="profiles.userID" label="User ID" required />
                </v-form>
            </v-card-title>
            <v-card-text>
                <ul>
                    <li v-for="[key, value] in Object.entries(profiles.cleanTraits)" :key="key">{{ key + ': ' + value }}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                <v-switch v-model="isSyncing" :loading="profiles.isLoading ? 'gray' : false" class="my-0">
                    <template v-slot:label>
                        <v-icon icon="mdi-cached" color="gray" />
                    </template>
                </v-switch>
                <v-btn @click="resetProfile()" class="mb-5">
                    <v-icon icon="mdi-delete" color="gray" />
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style lang="scss" scoped>

</style>