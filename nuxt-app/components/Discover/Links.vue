<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

function start() {
    analytics.track('Payment Program: Start Enrollment')
}

function abandon() {
    analytics.track('Payment Program: Abandon Enrollment')
}

const progress = ref(false)
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="start" block class="mt-2">Start Enrollment</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="abandon" block class="mt-2">Abandon Enrollment</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>