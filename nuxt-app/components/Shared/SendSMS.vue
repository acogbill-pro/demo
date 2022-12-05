<script setup>
import { useTwilio } from '~/stores/twilio';
const twilio = useTwilio()
const runtimeConfig = useRuntimeConfig()

const form = ref(null)
const valid = ref(true)

const phoneRules = [
    v => !!v || 'Valid Phone is required',
    v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Phone must be valid',
]

const fromNumber = ref('')
const toNumber = ref('') // doesn't need the '+1', Twilio store handles this
const message = ref('')

function submitForm() {
    if (toNumber.value !== '' && message.value !== '' && form.value.validate()) {
        twilio.sendSMS('Form Submission', fromNumber.value, toNumber.value, message.value)

        form.value.resetValidation()

        toNumber.value = ''
        message.value = ''
    }
}

onMounted(() => {
    fromNumber.value = runtimeConfig.fromTwilioNumbers[0]
})
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <h5>Send an SMS</h5>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-select v-model="fromNumber" :items="runtimeConfig.fromTwilioNumbers" label="From"
                        density="compact" />
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="12">
                    <v-text-field v-model="toNumber" required density="compact" variant="solo" single-line hide-details
                        :rules="phoneRules" label="To Number" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field v-model="message" required density="compact" variant="solo" single-line hide-details
                        label="Message" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped>

</style>