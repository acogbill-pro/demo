<script setup>
import scripts from '~/middleware/scripts.js'
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const props = defineProps({
    eventName: {
        type: String,
        default: 'Track Event',
    },
})

const form = ref(null)
// const eventName = ref('')
const eventDate = ref('')
const valid = ref(true)
const showCalendar = ref(false)

const propertiesAsObject = computed(() => {
    // const Date = new Date(eventDate.value)
    return { ['timestamp']: new Date(eventDate.value) }
})

function submitForm() {
    analytics.track(props.eventName, propertiesAsObject.value)
    // console.log(props.eventName, propertiesAsObject.value)
    eventDate.value = ''
}
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <h5>{{ eventName }}</h5>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="10">
                    <v-text-field v-model="eventDate" density="compact" variant="solo" single-line hide-details
                        label="Date" />
                </v-col>
                <!--<v-col cols="2">
                    <v-btn icon="mdi-calendar" @click="showCalendar = !showCalendar" variant="plain" block />
                </v-col>-->
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped></style>