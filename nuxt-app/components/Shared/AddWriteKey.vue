<script setup>
import { useAnalytics } from '~/stores/analytics'
const analytics = useAnalytics()

const form = ref(null)
const writeKey = ref('')
const valid = ref(true)

const validationRules = [
    //v => !!v || 'Name is required',
    v => (v && v !== ''),
    v => (v.split(' ').length < 2) || 'No spaces',
]

function submitForm() {
    if (writeKey.value !== '') {
        analytics.loadWriteKey(writeKey.value)
        writeKey.value = ''
        form.value.resetValidation()
    }
}

const collapse = ref(true)

function toggleForm() {
    collapse.value = !collapse.value
}
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions @click="toggleForm">Replace Write Key
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-show="!collapse">
                <v-container v-if="analytics.manualWriteKey === ''">
                    <v-form ref="form" v-model="valid" lazy-validation>

                        <v-row>

                            <v-col cols="10">
                                <v-text-field v-model="writeKey" :rules="validationRules" required density="compact"
                                    variant="solo" label="Write Key" />
                            </v-col>
                            <v-col cols="2">
                                <v-btn icon="mdi-check" @click="submitForm" variant="plain" block :disabled="!valid" />
                            </v-col>

                        </v-row>
                    </v-form>
                </v-container>
                <v-container v-else>
                    Currently logging to key: `{{ analytics.manualWriteKey }}`
                    <v-btn icon="mdi-delete" @click="analytics.unloadWriteKey" />
                </v-container>
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped>

</style>