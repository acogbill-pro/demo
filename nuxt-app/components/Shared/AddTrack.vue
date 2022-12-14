<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const form = ref(null)
const eventName = ref('')
const eventProperties = ref('')
const valid = ref(true)

const propertiesAsObject = computed(() => {
    if (eventProperties.value === '') return null
    try {
        const jsonToReturn = JSON.parse(eventProperties.value)
        return jsonToReturn
    } catch {
        console.log('Error parsing object, returning null')
        return null
    }
})

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

function submitForm() {
    analytics.track(eventName.value, propertiesAsObject.value)
    eventName.value = ''
    eventProperties.value = ''
    form.value.resetValidation()
}
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <h5>Track an Event</h5>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="10">
                    <v-text-field v-model="eventName" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Event Name" />
                </v-col>
                <!--<v-col cols="2">
                    <v-btn icon="mdi-plus" @click="addPair" variant="plain" block :disabled="!valid" />
                </v-col>-->
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="eventProperties" required density="compact" variant="solo" single-line
                        hide-details :label="`Properties: ${JSON.stringify({ name: 'value' })}`" />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped>

</style>