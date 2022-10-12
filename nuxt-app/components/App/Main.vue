<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="increment()">
                    <v-icon large icon="mdi-domain" />
                </v-btn>
                {{analytics.n}}
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

function increment() {
    analytics.increment()
}
</script>

<style lang="scss" scoped>

</style>