<script setup>
import { useAnalytics } from '~/stores/analytics'
import { useProfileStore } from '~~/stores/profiles';
const analytics = useAnalytics()
const profiles = useProfileStore()

const traitName = ref('')
const traitValue = ref('')
const valid = ref(true)

function submitForm() {
    if (traitName.value !== '' && traitValue.value !== '') {
        profiles.addTrait(traitName.value, traitValue.value)
    }
}
</script>

<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>

                <v-col cols="5">
                    <v-text-field v-model="traitName" required />
                </v-col>
                <v-col cols="5">
                    <v-text-field v-model="traitValue" required />
                </v-col>
                <v-col cols="2">
                    <v-btn icon="mdi-check" @click="submitForm" />
                </v-col>

            </v-row>
        </v-form>
    </v-container>
</template>

<style lang="scss" scoped>

</style>