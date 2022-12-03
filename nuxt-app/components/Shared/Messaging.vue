<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useTwilio } from '~/stores/twilio';
const analytics = useAnalytics()
const twilio = useTwilio()

const collapse = ref(true)

function toggleFields() {
    collapse.value = !collapse.value
}

function sendSMS() {
    twilio.sendSMS('9177576756', 'From new component!')
}
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions @click="toggleFields()">
            Send SMS
            <v-spacer />
            <v-btn @click="sendSMS()" icon="mdi-message" :color="statusColor" />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
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