<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profile.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
const profile = useProfileStore()
const traitStore = useProfileTraitsStore()
const currentTraits = computed(() => traitStore.cleanTraits)
const analytics = useAnalytics()

const first_name = ref(null)
const last_name = ref(null)
const name = computed(() => first_name.value + ' ' + last_name.value)
const user_id = computed(() => first_name.value + '_' + last_name.value + '_id')
const email = ref(null)
const street_address = ref(null)
const zip_code = ref(null)

watch(currentTraits, (newValue) => {
    console.log('detected trait change')
    if (newValue.first_name) first_name.value = newValue.first_name
    if (newValue.last_name) last_name.value = newValue.last_name
    if (newValue.street_address) street_address.value = newValue.street_address
    if (newValue.zip_code) zip_code.value = newValue.zip_code
    if (newValue.email) email.value = newValue.email
})

function identifyField(fieldName, fieldValue, isInFocus) {
    // console.log('identifyField called')
    if (isInFocus || !fieldValue) return
    const propertyObject = {}
    propertyObject[fieldName] = fieldValue
    const identifyDict = ['first_name', 'last_name', 'email', 'street_address', 'zip_code']
    if (identifyDict.includes(fieldName)) {
        // if (fieldName === 'last_name' && user_id.value) {
        //     propertyObject.user_id = user_id.value

        // }
        if (fieldName === 'last_name' && name.value) {
            propertyObject.name = name.value

        }
        analytics.identify(propertyObject)

        // console.log('is an identify trait')
    } else {
        console.log('not an identify trait')
    }
}

function trackField(eventName, propertyObject, isInFocus) {
    // console.log('identifyField called')
    if (isInFocus || !propertyObject || !eventName) return
    const trackDict = ['Select Program Interest']
    if (trackDict.includes(eventName)) {
        analytics.track(eventName, propertyObject)
        // console.log('is a track event', propertyObject)
    } else {
        console.log('not a track event')
    }
}

onMounted(() => analytics.page('Get Information'))
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-text-field label="First Name" variant="outlined" v-model="first_name"
                    @update:focused="(isInFocus) => identifyField('first_name', first_name, isInFocus)"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Last Name" variant="outlined" v-model="last_name"
                    @update:focused="(isInFocus) => identifyField('last_name', last_name, isInFocus)"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Street Address" variant="outlined" v-model="street_address"
                    @update:focused="(isInFocus) => identifyField('street_address', street_address, isInFocus)"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field label="Zip Code" variant="outlined" v-model="zip_code"
                    @update:focused="(isInFocus) => identifyField('zip_code', zip_code, isInFocus)"></v-text-field>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <v-select label="Highest Level of Education" :items="levelOptions" v-model="levelOfEducation"
                    variant="outlined" @update:model-value="(value) => identifyField('education', value, false)" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-select label="Graduation Year" :items="gradYearOptions" v-model="gradYear" variant="outlined"
                    @update:model-value="(value) => identifyField('gradYear', value, false)" />
            </v-col>
            <v-col>
                <v-select label="State" :items="stateOptions" v-model="state" variant="outlined"
                    @update:model-value="(value) => identifyField('state', value, false)" />
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
                        @update:focused="(isInFocus) => identifyField('email', email, isInFocus)"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Phone" variant="outlined" v-model="phone"
                        @update:focused="(isInFocus) => identifyField('phone', phone, isInFocus)"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Zip Code" variant="outlined" v-model="zip_code"
                        @update:focused="(isInFocus) => identifyField('zip_code', zip_code, isInFocus)"></v-text-field>
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
                <v-btn color="#F4B610" block>Submit</v-btn>
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