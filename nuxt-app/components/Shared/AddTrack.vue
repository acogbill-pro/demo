<script setup>
import scripts from '~/middleware/scripts.js'
import { useAnalytics } from '~/stores/analytics'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const form = ref(null)
const eventName = ref('')
const eventProperties = ref('')
const valid = ref(true)
const showCalendar = ref(false)

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
    analytics.track(eventName.value, propertiesAsObject.value)
    //console.log(propertiesAsObject.value)
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
                    <h5>Add an Event</h5>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="10">
                    <v-text-field v-model="eventName" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Event Name" />
                </v-col>
                <!--<v-col cols="2">
                    <v-btn icon="mdi-calendar" @click="showCalendar = !showCalendar" variant="plain" block />
                </v-col>-->
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>
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
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped>

</style>