<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
const analytics = useAnalytics()
const profiles = useProfileTraitsStore()

const options = ref(
    [
        'Adventure',
        'Beach',
        'Casino',
        'City Scene',
        'Family',
        'Golf',
        'Romance',
        'Ski',
        'Spa'
    ]
)

const selected = ref([])

function selection(newValue) {
    analytics.identify({ lastTypes: newValue })
}

function clicked(onValue) {
    //console.log('clicked', onValue, selected.value)
    if (!selected.value.includes(onValue)) {
        analytics.track('Resort Types: Added', { Type: onValue })
    } else {
        analytics.track('Resort Types: Removed', { Type: onValue })
    }
}

watchEffect(() => {
    if (selected.value.length === 0 && profiles.traits?.lastTypes?.length || 0 > 0) {
        selected.value = profiles.traits.lastTypes
    }
})
</script>

<template>
    <v-form>
        <div class="items">
            <div :class="selected.includes(option) ? 'selectedButton' : 'unselectedButton'" v-for="option in options"
                :key="option">
                <v-checkbox :label="option" v-model="selected" :value="option" multiple density="compact"
                    @update:modelValue="selection" @click="clicked(option)">
                    <!-- <template v-slot:append>
                            <v-icon large color="green" :icon="selected.includes(option) ? 'mdi-check-circle' : null" />
                        </template> -->
                </v-checkbox>
            </div>
        </div>
    </v-form>
</template>

<style lang="scss" scoped>
.items {
    column-count: 4;
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