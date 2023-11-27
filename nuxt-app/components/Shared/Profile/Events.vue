<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileEventsStore } from '~/stores/profileEvents.js'
const analytics = useAnalytics()
const eventStore = useProfileEventsStore()
</script>

<template>
    <ClientOnly>
        <v-card-text>
            <p class="mb-5">Anon ID: {{ analytics.anonymousID }}</p>
            <ul>
                <li v-for="name in eventStore.cleanEventNames" :key="name">
                    {{ name }}
                </li>
            </ul>
            <SharedTrackFormsAddTrack class="my-5" />
            <SharedTrackFormsAddDateTrack event-name="Date Event" />
        </v-card-text>
    </ClientOnly>
</template>

<style lang="scss" scoped></style>