<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

const tab = ref(null)

function tabbed(tabName) {
    // console.log(tabName)
}

function click(tabName) {
    analytics.track(`Opened Tab: ${tabName}`)
}
</script>

<template>
    <div>
        <v-card class="pa-0">
            <v-tabs v-model="tab" @update:modelValue="tabbed" bg-color="#FFFFFF" class="ma-0" align-tabs="end">
                <v-tab value="locations" @click="click('Locations')">
                    <span style="color: #000000; font-weight: bold;">Locations</span>
                    <v-icon :icon="tab !== 'locations' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="amenities" @click="click('Amenities')">
                    <span style="color: #000000; font-weight: bold;">Amenities</span>
                    <v-icon :icon="tab !== 'amenities' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="types" @click="click('Vacation Types')">
                    <span style="color: #000000; font-weight: bold;">Vacation Types</span>
                    <v-icon :icon="tab !== 'types' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="locations">
                        <HGVSelectorsLocations />
                    </v-window-item>

                    <v-window-item value="amenities">
                        <HGVSelectorsAmenities />
                    </v-window-item>

                    <v-window-item value="types">
                        <HGVSelectorsTypes />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<style lang="scss" scoped></style>

