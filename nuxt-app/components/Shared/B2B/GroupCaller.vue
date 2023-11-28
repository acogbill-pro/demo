<script setup>
import { useAnalytics } from '~/stores/analytics'
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const analytics = useAnalytics()

const valid = ref(null)
const accountId = ref(null)
const accountName = ref('Initech')

const collapse = ref(true)

const validationRules = [
    v => !!v || 'Name is required',
    v => (v && v !== '') || 'Name must be less than 10 characters',
]

const otherTraits = {
    industry: "Technology",
    employees: 329,
    plan: "enterprise",
    total_billed: 830,
    address: {
        street: '101 Spear Street, 5th Floor',
        city: 'San Francisco',
        country: 'USA',
        postalCode: '94105',
        state: 'CA'
    }
}

const allTraits = computed(() => {
    return Object.assign(otherTraits, { name: accountName.value })
})

function submitForm() {
    if (!valid.value || accountId.value === null) return
    // console.log(accountId.value, allTraits.value)
    analytics.group(accountId.value, allTraits.value)
}

onMounted(() => {
    accountId.value = uuidv4()

})
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions>
            Add To Group
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" @click="collapse = !collapse" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="accountName" :rules="validationRules" required density="compact" variant="solo"
                        single-line hide-details label="Account Name" class="mb-1" />
                    <v-text-field v-model="accountId" required density="compact" variant="solo" single-line hide-details
                        label="Account ID" class="mb-1" />
                    <v-btn @click="submitForm" block>Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-expand-transition>

    </v-card>
</template>

<style lang="scss" scoped></style>