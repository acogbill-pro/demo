<script setup>
import { useTwilio } from '~/stores/twilio';
const twilio = useTwilio()
const runtimeConfig = useRuntimeConfig()

const collapse = ref(true)

function toggleFields() {
    collapse.value = !collapse.value
}

function sendSMS() {
    twilio.sendSMS('Button Press', '', '', 'Yet another')
}

function sendMMS() {
    twilio.sendMMS('Button Press', '', '', 'Yet another')
}

const statusColor = computed(() => {
    if (twilio.statusOK) return 'green'
    if (twilio.status === '') return 'gray'
    return 'red'
})
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions>
            Messaging
            <v-spacer />
            <v-btn @click="sendMMS()" icon="mdi-message-image" :color="statusColor" />
            <v-btn @click="sendSMS()" icon="mdi-message" :color="statusColor" />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" @click="toggleFields()" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                <SharedSendSMS />
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped>

</style>