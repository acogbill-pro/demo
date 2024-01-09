<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~~/stores/profileTraits';
import { useProfileStore } from '~/stores/profile'
const profile = useProfileStore()

const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const form = ref(null)
const traitName = ref('')
const traitPrompt = ref('')
const valid = ref(true)

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

async function submitPrompt() {
    if (!profile.hasLoaded || traitName.value === '' || traitPrompt.value === '') return
    await profile.loadSmartTrait(traitName.value, traitPrompt.value)
}

// function submitForm() {
//     if (traitName.value !== '' && traitValue.value !== '') {
//         profiles.addTrait(traitName.value, traitValue.value)
//         traitName.value = ''
//         traitValue.value = ''
//         form.value.resetValidation()
//     }
// }

function addTrait(withTraitObject) {
    analytics.identify(withTraitObject)
}

onMounted(() => {

})
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="2">
                    <v-img src="/images/openai-logomark.png" height="20" />
                </v-col>
                <v-col cols="8">

                    <h5>Add a Smart Trait</h5>
                </v-col>

            </v-row>

            <v-row>

                <v-col cols="10">
                    <v-text-field v-model="traitName" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Trait Name" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitPrompt" variant="plain" block :disabled="!valid" />
                </v-col>

            </v-row><v-row>
                <v-col cols="12">
                    <!-- <v-text-field v-model="traitValue" required density="compact" variant="solo" single-line hide-details
                    label="Value" /> -->
                    <v-card variant="outlined">
                        <v-card-text>
                            <div v-if="profile.smartTrait === '' && !profile.loading">
                                <v-textarea v-model="traitPrompt" density="compact" variant="solo" hide-details
                                    :rules="validationRules" required label="Trait Logic" />
                            </div>

                            <div v-if="profile.loading">
                                <v-progress-circular indeterminate></v-progress-circular>
                            </div>
                            <div v-if="profile.smartTrait !== ''">

                                {{ profile.smartTrait }}


                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn icon="mdi-close" @click="profile.clearSmartTrait()"
                                :disabled="profile.smartTrait === ''" />
                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-check" @click="addTrait(profile.smartTrait)"
                                :disabled="profile.smartTrait === ''" />

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped></style>