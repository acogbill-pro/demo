<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

const options = ref(
    [
        'Baltimore, MD',
        'Barcelona, Spain',
        'Brisbane, Australia',
        'Charleston, SC',
        'Galveston, TX',
        'Jacksonville, FL',
        'London, England',
        'Los Angeles, CA',
        'Miami, FL',
        'Mobile, AL',
        'New Orleans, LA',
        'New York, NY',
        'Norfolk, VA',
        'Port Canaveral (Orlando), FL',
        'Rome (Civitavecchia), Italy',
        'San Francisco, CA',
        'Seattle, WA',
        'Singapore',
        'Sydney, Australia',
        'Tampa, FL',
    ]
)

const selected = ref([])

function selection(newValue) {
    analytics.identify({ lastSailFrom: newValue })
}

function clicked(onValue) {
    //console.log('clicked', onValue, selected.value)
    if (!selected.value.includes(onValue)) {
        analytics.track('Sail From: Added', { Origin: onValue })
    } else {
        analytics.track('Sail From: Removed', { Origin: onValue })
    }
}

watchEffect(() => {
    if (selected.value.length === 0 && profiles.traits?.lastSailFrom?.length || 0 > 0) {
        selected.value = profiles.traits.lastSailFrom
    }
})
</script>

<template>
    <v-form>
        <div class="items">
            <div :class="selected.includes(option) ? 'selectedButton' : 'unselectedButton'" v-for="option in options"
                :key="option">
                <v-checkbox :label="option" v-model="selected" :value="option" multiple density="compact" :false-icon="null"
                    :true-icon="null" @update:modelValue="selection" @click="clicked(option)">
                    <template v-slot:append>
                        <v-icon large color="green" :icon="selected.includes(option) ? 'mdi-check-circle' : null" />
                    </template>
                </v-checkbox>
            </div>
        </div>
    </v-form>
</template>

<style lang="scss" scoped>
.items {
    column-count: 5;
    column-gap: 10px;
    padding: 0 5px;
}

.button {
    border-color: '#000000';
}

.selectedButton {
    background-color: '#000000';
}

.unselectedButton {
    color: '#444444';
}
</style>