<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileEventsStore } from '~/stores/profileEvents.js'
const analytics = useAnalytics()
const eventStore = useProfileEventsStore()

const messages = ref([])
const message = ref('')

function sendMessage() {
    if (message.value === '') return
    analytics.track('Chat Message', { contents: message.value })
    messages.value.push(message.value)
    message.value = ''
}

onMounted(() => analytics.track('Chat Session Started'))
onUnmounted(() => {
    if (messages.value.length > 0) analytics.track('Chat Session Ended', { transcript: messages.value })
})
</script>

<template>
    <ClientOnly>
        <!-- <v-card-text> -->
        <!-- <p class="mb-5">Anon ID: {{ analytics.anonymousID }}</p> -->
        <v-card variant="outlined">
            <!-- <v-card-title>Start a Chat</v-card-title> -->
            <v-card-text>
                <div class="ml-2" v-if="messages.length > 0">
                    <li v-for="(message, number) in messages" :key="number" class="mb-1">
                        <v-chip>{{ message }}</v-chip>
                    </li>
                </div>
                <!-- <v-text-field v-model="traitName" required density="compact" variant="solo"
                    single-line hide-details label="Name" class="mb-3" /> -->
                <v-textarea class="mt-4" v-model="message" density="compact" variant="solo" hide-details required
                    label="Say something" />

            </v-card-text>
            <v-card-actions>
                <!-- <v-btn icon="mdi-close" @click="profile.clearSmartTrait()" :disabled="profile.smartTrait === ''" /> -->
                <v-spacer></v-spacer>
                <!-- <v-btn icon="mdi-check" @click="submitPrompt(profile.smartTrait)"
                    :disabled="traitName === '' || traitPrompt === ''" /> -->
                <v-btn icon="mdi-send" @click="sendMessage" :disabled="message === ''" />
            </v-card-actions>
        </v-card>
        <!-- <SharedEventList />
            <ul class="ml-2">
                <li v-for="name in eventStore.cleanEventNames" :key="name" class="mb-1">
                    {{ name }}
                </li>
            </ul> -->
        <!-- <SharedTrackFormsAddTrack class="my-5" />
            <SharedTrackFormsAddDateTrack event-name="Date Event" /> -->
        <!-- </v-card-text> -->
    </ClientOnly>
</template>

<style lang="scss" scoped></style>