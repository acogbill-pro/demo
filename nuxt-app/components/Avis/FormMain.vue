<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profile.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
const profile = useProfileStore()
const traitStore = useProfileTraitsStore()
const currentTraits = computed(() => traitStore.cleanTraits)
const analytics = useAnalytics()

const zip_code = ref(null)
const date = ref(null)
const time = ref(null)

watch(currentTraits, (newValue) => {
    console.log('detected trait change')
    refreshFields(newValue)
})

function populate() {
    zip_code.value = '90210'
    date.value = new Date()
    time.value = '12:00'
}

function submit() {
    console.log('submitting')
    if (!zip_code.value || !date.value || !time.value) return
    const propertyObject = {
        zip_code: zip_code.value,
        date: date.value,
        time: time.value
    }
    analytics.track('Reservation: Search', propertyObject)

    navigateTo({
        path: '/avis/products/',
        // query: {
        //     SKU
        // }
    })
}

function refreshFields(newValue) {
    console.log('refreshing fields', newValue)
    if (newValue.zip_code) zip_code.value = newValue.zip_code
    if (newValue.date) date.value = newValue.date
    if (newValue.time) time.value = newValue.time
}

function trackField(fieldName, fieldValue, isInFocus) {
    // console.log('trackField called')
    if (isInFocus || !fieldValue) return
    const propertyObject = {}
    propertyObject[fieldName] = fieldValue
    const identifyDict = ['zip_code', 'date', 'time']
    if (identifyDict.includes(fieldName)) {
        // if (fieldName === 'last_name' && user_id.value) {

        analytics.track('Reservation: Search', propertyObject)

        // console.log('is an identify trait')
    } else {
        console.log('not an allowed property')
    }
}

onMounted(() => {
    // analytics.page('Get Information')
    refreshFields(currentTraits.value)
})
</script>

<template>
    <v-container>
        <!-- <v-row>
            <v-col cols="6">
                <v-text-field label="First Name" variant="solo" v-model="first_name"
                    @update:focused="(isInFocus) => trackField('first_name', first_name, isInFocus)"></v-text-field>
            </v-col>
        </v-row> -->
        <v-row>
            <v-col cols="6">
                <v-text-field label="Location or Zip Code" variant="solo" v-model="zip_code"
                    @update:focused="(isInFocus) => trackField('zip_code', zip_code, isInFocus)"></v-text-field>
            </v-col>
            <!-- </v-row>
        <v-row> -->
            <v-col cols="6">
                <v-text-field label="Date" variant="solo" v-model="date"
                    @update:focused="(isInFocus) => trackField('date', date, isInFocus)"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Time" variant="solo" v-model="time"
                    @update:focused="(isInFocus) => trackField('time', time, isInFocus)"></v-text-field>
            </v-col>
            <v-col />

        </v-row>
        <!-- <v-row>
            <v-col>
                <v-select label="Highest Level of Education" :items="levelOptions" v-model="levelOfEducation"
                    variant="outlined" @update:model-value="(value) => trackField('education', value, false)" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-select label="Graduation Year" :items="gradYearOptions" v-model="gradYear" variant="outlined"
                    @update:model-value="(value) => trackField('gradYear', value, false)" />
            </v-col>
            <v-col>
                <v-select label="State" :items="stateOptions" v-model="state" variant="outlined"
                    @update:model-value="(value) => trackField('state', value, false)" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select label="Program of Interest" :items="programOptions" v-model="programOfInterest"
                    variant="outlined"
                    @update:model-value="(value) => trackField('Select Program Interest', { program: value }, false)" />
            </v-col>
        </v-row>
        <div v-show="expand" class="my-3">
            
            <v-row>
                <v-col>
                    <v-text-field label="Email" variant="outlined" v-model="email"
                        @update:focused="(isInFocus) => trackField('email', email, isInFocus)"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Phone" variant="outlined" v-model="phone"
                        @update:focused="(isInFocus) => trackField('phone', phone, isInFocus)"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Zip Code" variant="outlined" v-model="zip_code"
                        @update:focused="(isInFocus) => trackField('zip_code', zip_code, isInFocus)"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p class="small">By submitting this form, I provide my signature,
                        expressly
                        consenting to
                        calls, prerecorded
                        messages, emails and/or texts regarding my educational options from Chamberlain University
                        (Chamberlain) and its affiliates and contractors using an automated dialing system to the number
                        and
                        email address provided. I understand my consent is not required to enroll at Chamberlain, and
                        that I
                        can withdraw my consent at any time. To request information without consenting, please call
                        877-751-5783.</p>
                </v-col>
            </v-row>
        </div> -->
        <v-row>
            <v-col>
                <v-btn color="#000000" block @click="submit">Select My Car</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn variant="outlined" @click="populate">Populate</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<style lang="scss" scoped>
.small {
    font-size: 7pt;
    font-style: italic;
}
</style>