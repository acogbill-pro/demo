<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileTraitsStore } from '~~/stores/profileTraits';
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const form = ref(null)
const traitName = ref('')
const traitValue = ref('')
const valid = ref(true)

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

function submitForm() {
    if (traitName.value !== '' && traitValue.value !== '') {
        profiles.addTrait(traitName.value, traitValue.value)
        traitName.value = ''
        traitValue.value = ''
        form.value.resetValidation()
    }
}
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <h5>Add a Trait</h5>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="5">
                    <v-text-field v-model="traitName" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Trait Name" />
                </v-col>
                <v-col cols="5">
                    <v-text-field v-model="traitValue" required density="compact" variant="solo" single-line hide-details
                        label="Value" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                </v-col>

            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped></style>