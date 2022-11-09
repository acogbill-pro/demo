<script setup>
import { useAnalytics } from '~/stores/analytics'
const analytics = useAnalytics()

const collapse = ref(true)

function toggleList() {
    collapse.value = !collapse.value
}
</script>

<template>
    <v-card>
        <v-card-actions @click="toggleList()">
            Events
            <v-icon :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                <ul>
                    <li v-for="(event, index) in analytics.allEvents" :key="`event-${index}`">{{ event }}</li>
                </ul>
            </v-card-text>
        </v-expand-transition>

    </v-card>
</template>

<style lang="scss" scoped>

</style>