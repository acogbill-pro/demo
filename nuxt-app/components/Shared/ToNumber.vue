<script setup>
import { useTwilio } from '~~/stores/twilio';
const twilioStore = useTwilio()

const form = ref(null)
const toNumber = ref('')
const valid = ref(true)

const validationRules = [
    //v => !!v || 'Name is required',
    v => (v && v !== ''),
    v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Phone must be valid',
]

function submitForm() {
    if (toNumber.value !== '') {
        twilioStore.loadToNumber(toNumber.value)
        toNumber.value = ''
        form.value.resetValidation()
    }
}
</script>

<template>
    <v-container v-if="twilioStore.manualToNumber === ''">
        <v-form ref="form" v-model="valid" lazy-validation>

            <v-row>

                <v-col cols="10">
                    <v-text-field v-model="toNumber" :rules="validationRules" required density="compact" variant="solo"
                        label="To Phone Number" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>

            </v-row>
        </v-form>
    </v-container>
    <v-container v-else>
        Currently sending SMS to: `{{ twilioStore.manualToNumber }}`
        <v-btn icon="mdi-delete" @click="twilioStore.unloadToNumber" />
    </v-container>
</template>

<style lang="scss" scoped>

</style>