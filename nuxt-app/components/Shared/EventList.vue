<script setup>
import { useAnalytics } from '~/stores/analytics'
const analytics = useAnalytics()

const collapse = ref(true)
const callOverlay = ref(false)
const truckOverlay = ref(false)
const storeOverlay = ref(false)

function toggleList() {
    collapse.value = !collapse.value
}
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions>
            User Events
            <v-spacer />
            <v-btn icon="mdi-phone" @click="callOverlay = true" />
            <v-overlay v-model="callOverlay" location-strategy="static" class="align-center justify-center">
                <SharedTrackFormsServiceCall v-on:and-then="callOverlay = false" />
            </v-overlay>
            <v-btn icon="mdi-truck" @click="truckOverlay = true" />
            <v-overlay v-model="truckOverlay" location-strategy="static" class="align-center justify-center">
                <SharedTrackFormsShippingUpdate v-on:and-then="truckOverlay = false" />
            </v-overlay>
            <v-btn icon="mdi-store" @click="storeOverlay = true" />
            <v-overlay v-model="storeOverlay" location-strategy="static" class="align-center justify-center">
                <SharedTrackFormsStoreVisit v-on:and-then="storeOverlay = false" />
            </v-overlay>
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" @click="toggleList()" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                <ul>
                    <li v-for="(event, index) in analytics.allEvents" :key="`event-${index}`">{{ event }}</li>
                </ul>
                <SharedTrackFormsAddTrack class="my-5" />
                <SharedTrackFormsAddDateTrack event-name="Date Event" />
            </v-card-text>
        </v-expand-transition>

    </v-card>
</template>

<style lang="scss" scoped></style>