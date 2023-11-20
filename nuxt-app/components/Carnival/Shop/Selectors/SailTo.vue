<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const options = ref(
    [
        'Alaska',
        'The Bahamas',
        'Bermuda',
        'Canada & New England',
        'Caribbean',
        'Europe',
        'Greenland & Canada',
        'Hawaii',
        'Mexico',
        'Panama Canal',
        'Transatlantic',
        'Transpacific',
        'Asia',
        'Australia',
        'New Zealand',
        'Papua New Guinea',
        'South Pacific',
    ]
)

const selected = ref([])

function selection(newValue) {
    analytics.identify({ lastSailTo: newValue })
}

function clicked(onValue) {
    //console.log('clicked', onValue, selected.value)
    if (!selected.value.includes(onValue)) {
        analytics.track('Sail To: Added', { Destination: onValue })
    } else {
        analytics.track('Sail To: Removed', { Destination: onValue })
    }
}

watchEffect(() => {
    if (selected.value.length === 0 && profiles.traits?.lastSailTo?.length || 0 > 0) {
        selected.value = profiles.traits.lastSailTo
    }
})

onMounted(() => {
    // console.log(profiles.traits)
})
// watch(selected, selection)
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