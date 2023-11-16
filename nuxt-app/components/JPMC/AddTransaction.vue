<script setup>
import scripts from '~/middleware/scripts.js'
import { useAnalytics } from '~/stores/analytics'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const form = ref(null)
const eventNameRef = ref('')
const merchantRef = ref('')
const amountRef = ref(0)

const eventProperties = ref('')
const valid = ref(true)
const showCalendar = ref(false)
const serverSide = ref(true)
const switchLabel = computed(() => {
    return serverSide.value ? 'Server-side' : 'Client-side'
})

const propertiesAsObjectARCH = computed(() => {
    if (eventProperties.value === '') return null
    try {
        const toReturn = JSON.parse(eventProperties.value)
        //console.log(toReturn)

        Object.entries(toReturn).forEach(
            ([key, value]) => {
                toReturn[key] = scripts.transformStringToType(value) // Number, Date, Boolean, etc.
            }
        )
        //console.log(toReturn)
        return toReturn
    } catch (error) {
        console.log(error)
        return null
    }
})

const propertiesAsObject = computed(() => {
    if (amountRef.value === 0) return null
    const merchant = merchantRef.value
    const amount = Number(amountRef.value)
    const currency = 'USD'
    const transactionId = Number(Math.random().toString().slice(2, 11))

    return {
        merchant,
        amount,
        currency,
        transactionId,
        asObject: { merchant, amount, currency, transactionId },
        asObjectString: JSON.stringify({ merchant, amount, currency, transactionId })
    }
})

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

function isValidJSON(withString) {
    try {
        JSON.parse(withString);
    } catch (e) {
        return false;
    }
    return true;
}

function hasSpacesInObjectKeys(withString) {
    try {
        const asObject = JSON.parse(withString)
        const arrayOfKeys = Object.keys(asObject)
        const joinedArray = arrayOfKeys.join('')
        return joinedArray.split(' ').length > 1
    } catch (e) {
        return false;
    }
}

const propertiesRules = [
    //v => !(v.split(' ').length > 1) || 'No spaces allowed',
    v => !hasSpacesInObjectKeys(v) || 'Object keys cannot have spaces',
    v => isValidJSON(v) || 'Must be valid JSON',
]

function submitForm() {
    if (!serverSide.value) {
        analytics.track(eventNameRef.value, propertiesAsObject.value)
    } else {
        analytics.trackTransaction(eventNameRef.value, propertiesAsObject.value)
    }
    //console.log(propertiesAsObject.value)
    eventNameRef.value = ''
    merchantRef.value = ''
    amountRef.value = 0
    eventProperties.value = ''
    form.value.resetValidation()
}
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <h5>Add an Event</h5>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="12">
                    <v-text-field v-model="eventNameRef" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Transaction Name" />
                </v-col>
                <!--<v-col cols="2">
                    <v-btn icon="mdi-calendar" @click="showCalendar = !showCalendar" variant="plain" block />
                </v-col>-->


            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="merchantRef" required density="compact" variant="solo" single-line hide-details
                        label="Merchant Name" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="amountRef" required density="compact" variant="solo" single-line hide-details
                        label="Amount" />
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col cols="12">
                    <v-text-field v-model="merchant" required density="compact" variant="solo" single-line hide-details
                        label="Merchant Name" />
                </v-col>
            </v-row> -->

            <v-row>
                <v-col cols="10">
                    <v-switch v-model="serverSide" :label="switchLabel"></v-switch>
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped></style>