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
        <v-card-actions @click="toggleForm">Setup
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-show="!collapse">
                <SharedWriteKey />
                <SharedToNumber />
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped>

</style>