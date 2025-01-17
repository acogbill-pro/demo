<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

const facebookToggle = ref(false)
const facebookCampaign = ref('')

function toggleFacebook(newValue) {
    facebookToggle.value = newValue
    facebookCampaign.value = newValue ? 'def456' : ''
}

const audience = ref(null)
const audienceOptions = [
    {
        name: 'New Customer',
        id: 'new_customer'
    },
    {
        name: '30 Day Spend Decrease',
        id: 'spend_decreasing'
    },
    {
        name: 'No Mobile App',
        id: 'mobile_app_false'
    },
    {
        name: 'High Value',
        id: 'high_value'
    }
]

const createOverlay = ref(false)
const audienceDescription = ref('')

function createNew() {

    createOverlay.value = true
}

const subject = ref('')
const hero = ref('')
const body = ref('')

function populate() {
    subject.value = 'User Onboarding Journey',
        hero.value = 'http://www.example.com/image.jpg',
        body.value = 'We recommend that the first step in your journey be downloading our app.'
}

const propertiesObject = computed(() => {
    return {
        journeyId: "bcd234",
        audience: {
            id: audience.value,
            description: audienceDescription.value,
        },
        facebook: facebookToggle.value ? {
            date: new Date(),
            duration: 7,
            campaignId: facebookCampaign.value
        } : null,
        emails:
            [
                {
                    subject: subject.value,
                    hero: hero.value,
                    body: body.value,
                },
                {
                    subject: 'Make sure you download the app!',
                    hero: 'https://www.andycogbill.com/pristine/images/grocery.jpg',
                    body: 'You still have not downloaded the app...',
                },
            ]
    }
})

function start() {
    analytics.track('Start Journey', propertiesObject.value)
}
</script>

<template>
    <v-container>
        <v-overlay v-model="createOverlay" location-strategy="static" class="align-center justify-center">
            <v-container class="bg-white">
                <v-row>
                    <v-col>
                        <v-textarea variant="solo" v-model="audienceDescription" label="Describe your audience">
                            <template v-slot:append>
                                <v-btn icon="mdi-content-save" @click="createOverlay = false" />
                            </template>
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-overlay>
        <v-row>
            <v-col>
                <v-select variant="solo" v-model="audience" :items="audienceOptions" item-title="name" item-value="id"
                    label="Select Audience">
                    <template v-slot:append>
                        <v-btn icon="mdi-pencil" @click="createNew" />
                    </template>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-checkbox v-model="facebookToggle" @update:model-value="toggleFacebook"
                    :label="`Facebook Campaign ${facebookCampaign}`" variant="solo"></v-checkbox>
            </v-col>
            <!-- <v-col>
                <div v-if="facebookToggle">Campaign ID `def456`</div>
            </v-col> -->
        </v-row>
        <v-row>
            <v-col>
                <h3>Email Touch 1</h3>
                <v-text-field v-model="subject" label="Subject Line" variant="solo"></v-text-field>
                <v-text-field v-model="hero" label="Hero Image" variant="solo"></v-text-field>
                <v-text-field v-model="body" label="Body Copy" variant="solo"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <!-- <v-col> -->
            <v-btn @click="start">Start Journey</v-btn>
            <v-spacer />
            <v-btn @click="populate" icon="mdi-check" />
            <!-- </v-col> -->
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>