<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const consent = ref([])

const traitsObject = computed(() => {
    return {
        // first_name: first_name.value,
        // last_name: last_name.value,
        // name: name.value,
        // email: email.value,
        consent: consent.value,
        consentJSON: JSON.stringify(consent.value),
        // phone: '+19177576756'
    }
})

watch(traitsObject, submit)

function submit() {
    // if (form.value.validate()) {
    // analytics.loginWithTraits({ user_id: user_id.value, first_name: first_name.value, last_name: last_name.value, name: name.value, email: email.value })

    analytics.track("Consent Update", traitsObject.value)
    analytics.identify(traitsObject.value)


    // const fromNumber = JSON.parse(runtimeConfig.fromTwilioNumbers)[0]
    // twilio.sendSMS('Welcome SMS', '8455346456', '9177576756', `Hi ${first_name.value}! Welcome in.`)

}
</script>

<template>
    <v-card class="mb-3">
        <v-card-title>
            Consent To:
        </v-card-title>
        <v-card-text>
            <v-checkbox v-model="consent" label="Email" value="email" dense></v-checkbox>
            <v-checkbox v-model="consent" label="SMS" value="sms"></v-checkbox>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped></style>