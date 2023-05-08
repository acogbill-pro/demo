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
            <v-tabs v-model="tab" @update:modelValue="tabbed" bg-color="#FFFFFF" align-tabs="center" class="ma-0" grow>
                <v-tab value="sailTo" @click="click('Sail To')">
                    <span style="color: #000000; font-weight: bold;">Sail To</span>
                    <v-icon :icon="tab === 'sailTo' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="sailFrom" @click="click('Sail From')">
                    <span style="color: #000000; font-weight: bold;">Sail From</span>
                    <v-icon :icon="tab === 'sailFrom' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="dates" @click="click('Dates')">
                    <span style="color: #000000; font-weight: bold;">Dates</span>
                    <v-icon :icon="tab === 'dates' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="duration" @click="click('Duration')">
                    <span style="color: #000000; font-weight: bold;">Duration</span>
                    <v-icon :icon="tab === 'duration' ? 'mdi-menu-down' : 'mdi-menu-up'" color="#000000" />
                </v-tab>
                <v-tab value="search" color="red"><span style="color: #000000; font-weight: bold;">Search
                        Cruises</span></v-tab>
            </v-tabs>

            <v-card-text v-show="tab !== 'search'">
                <v-window v-model="tab">
                    <v-window-item value="sailTo">
                        <CarnivalShopSelectorsSailTo />
                    </v-window-item>

                    <v-window-item value="sailFrom">
                        <CarnivalShopSelectorsSailFrom />
                    </v-window-item>

                    <v-window-item value="dates">
                        <CarnivalShopSelectorsDates />
                    </v-window-item>
                    <v-window-item value="duration">
                        Duration
                    </v-window-item>
                    <v-window-item value="search">
                        Search
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<style lang="scss" scoped></style>

