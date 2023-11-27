<script setup>
import scripts from '~/middleware/scripts.js'
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const form = ref(null)
const eventName = ref('Shipping Update')
const eventProperties = ref('{"status":"Delayed","reason":"Product Backordered","new_ship_date":"2023-01-01T05:00:00.000Z"}')
const valid = ref(true)
const showCalendar = ref(false)
const serverSide = ref(true)
const switchLabel = computed(() => {
    return serverSide.value ? 'Server-side' : 'Client-side'
})

const emit = defineEmits(['andThen'])

const propertiesAsObject = computed(() => {
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
        analytics.track(eventName.value, propertiesAsObject.value)
    } else {
        analytics.trackServerSide(eventName.value, propertiesAsObject.value)
    }
    //console.log(propertiesAsObject.value)
    eventName.value = 'Shipping Update'
    eventProperties.value = '{"status":"Delayed","reason":"Product Backordered","new_ship_date":"2023-01-01T05:00:00.000Z"}'
    form.value.resetValidation()
    emit('andThen')
}
</script>

<template>
    <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>
                <h5>Add a Shipping Update</h5>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <v-col cols="12">
                            <v-text-field v-model="eventName" :rules="validationRules" required density="compact"
                                variant="solo" single-line hide-details label="Event Name" />
                        </v-col>
                        <!--<v-col cols="2">
                    <v-btn icon="mdi-calendar" @click="showCalendar = !showCalendar" variant="plain" block />
                </v-col>-->


                    </v-row>
                    <v-expand-transition>
                        <v-row v-if="!showCalendar">
                            <v-col cols="12">
                                <v-textarea v-model="eventProperties" :rules="propertiesRules" variant="solo" auto-grow
                                    :label="`Properties: ${JSON.stringify({ name: 'value' })}`" />
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12">
                                Calendar
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    <v-row>
                        <v-col cols="10">
                            <v-switch v-model="serverSide" :label="switchLabel"></v-switch>
                        </v-col>
                        <v-col cols="2">
                            <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-form>
    </v-card>
</template>

<style lang="scss" scoped></style>