<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()
const { arrayDifference } = useHelpers()

const destinationArray = ['Arizona', 'California', 'Colorado', 'Florida', 'Hawaii', 'Indiana', 'Missouri']

const selectedDestinations = ref([])

watch(selectedDestinations, (newVal, prevVal) => {
    if (selectedDestinations.value.length < 1) return
    const valueSelected = arrayDifference(newVal, prevVal)
    if (valueSelected.length === 1) {
        analytics.track('Destination Selected', { Destination: valueSelected[0] })
        analytics.identify({ DiamondDestinations: newVal })
    }
})

function isDate(possibleDate) {
    return !isNaN(Date.parse(possibleDate))
}

const checkInDate = ref('')
const checkOutDate = ref('')

function checkInChanged(inFocus) {
    // console.log(inFocus, checkInDate.value)
    const formatted = new Date(checkInDate.value)
    if (!inFocus && isDate(checkInDate.value)) analytics.track('Check In Date', { Date: formatted })
}

function checkOutChanged(inFocus) {
    // console.log(inFocus, checkOutDate.value)
    const formatted = new Date(checkOutDate.value)
    if (!inFocus && isDate(checkOutDate.value)) analytics.track('Check Out Date', { Date: formatted })
}
</script>

<template>
    <div class="search">
        <v-container>
            <v-row>
                <v-col>
                    <v-select clearable chips label="DESTINATION" :items="destinationArray" multiple variant="solo"
                        v-model="selectedDestinations">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Check In Date" variant="solo" v-model="checkInDate"
                        @update:focused="checkInChanged"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Check Out Date" variant="solo" v-model="checkOutDate"
                        @update:focused="checkOutChanged"></v-text-field>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<style lang="scss" scoped>
.search {
    background-color: #4986BC;
}
</style>

