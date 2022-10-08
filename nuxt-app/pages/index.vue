<template>
    <div>
        <v-btn @click="logger()">
            <v-icon large icon="mdi-domain" />
        </v-btn>
        {{firstStore.n}}
    </div>
</template>

<script setup>
import { useFirstStore } from '~/stores/first.js'
import { useAnalytics } from '~/stores/analytics.js'

const firstStore = useFirstStore()
const analytics = useAnalytics()

function logger() {
    console.log('log!')
    console.log(analytics)
}
</script>

<style lang="scss" scoped>

</style>