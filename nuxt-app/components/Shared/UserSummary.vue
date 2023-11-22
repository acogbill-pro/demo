<script setup>
import { useProfileStore } from '~/stores/profile'
import { useProfileEventsStore } from '~/stores/profileEvents';
const eventStore = useProfileEventsStore()

const profile = useProfileStore()

const collapse = ref(true)
const loading = ref(true)

async function toggleExpand() {
    if (!profile.hasLoaded) return
    loading.value = true

    profile.loadSummary()

    collapse.value = !collapse.value

    loading.value = false
}

onMounted(() => {

})
</script>

<template>
    <v-card class="mb-5" v-if="profile.hasLoaded">
        <v-card-actions @click="toggleExpand">
            <v-img src="/images/openai-logomark.png" height="20" />
            User Summary
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                <!-- <ul>
                    <li v-for="(event, index) in eventStore.cleanEvents" :key="index">
                        {{ event.event }}
                    </li>
                </ul> -->
                <div v-if="loading">
                    <!-- <v-skeleton-loader type="text">Loading</v-skeleton-loader> -->
                    Loading
                </div>
                <div v-else>
                    {{ profile.summary }}
                </div>

            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped></style>