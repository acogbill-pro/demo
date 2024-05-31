<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

function start() {
    analytics.track('Payment Program: Start Enrollment')
}

function abandon() {
    analytics.track('Payment Program: Abandon Enrollment')
}
</script>

<template>
    <div>
        <v-btn @click="start" block class="mt-2">Start Enrollment</v-btn>
        <v-btn @click="abandon" block class="mt-2">Abandon Enrollment</v-btn>
    </div>
</template>

<style lang="scss" scoped></style>