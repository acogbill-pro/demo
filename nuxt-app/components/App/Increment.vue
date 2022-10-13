<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

function increment() {
    analytics.increment()
}
</script>

<template>
    <div>
        <v-btn @click="increment()">
            <v-icon large icon="mdi-domain" />
        </v-btn>
        {{analytics.n}}
    </div>
</template>

<style lang="scss" scoped>

</style>