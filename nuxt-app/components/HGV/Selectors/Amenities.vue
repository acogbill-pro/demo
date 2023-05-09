<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileStore } from '~/stores/profiles.js'
const analytics = useAnalytics()
const profiles = useProfileStore()

const options = ref(
    [
        'Activity Center',
        'ATM',
        'Basketball Courts',
        'BBQ Grill',
        'Beach',
        'Boardwalk Access',
        'Bike',
        'Business Center',
        'Kids Rec',
        'Concierge',
        'Convenience Store',
        'Dining & Bars',
        'Dry Cleaning',
        'Fishing',
        'Fitness Center',
        'Game Room',
        'Garden',
        'Gift Shop',
        'Golf',
        'Groceries',
        'Hot Tub',
        'Indoor Pool',
        'Laundry',
        'Lounge',
        'Meeting Rooms',
        'Mini-Golf',
        'Movie Theater',
        'Picnic Area',
        'Pool',
        'Pool Bar',
        'Rec Room',
        'Restaurant',
        'Sauna',
        'Shopping',
        'Ski Access',
        'Spa',
        'Splash Pad',
        'Sports Court',
        'Steam Room',
        'Table Tennis',
        'Tennis',
        'Volleyball',
        'Walking Path',
        'Watersports',
        'Wi-Fi'
    ]
)

const selected = ref([])

function selection(newValue) {
    analytics.identify({ lastAmenities: newValue })
}

function clicked(onValue) {
    //console.log('clicked', onValue, selected.value)
    if (!selected.value.includes(onValue)) {
        analytics.track('Amenity: Added', { Type: onValue })
    } else {
        analytics.track('Amenity: Removed', { Type: onValue })
    }
}

watchEffect(() => {
    if (selected.value.length === 0 && profiles.traits?.lastAmenities?.length || 0 > 0) {
        selected.value = profiles.traits.lastAmenities
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