<template>
    <div>
        <v-btn @click="increment()">
            <v-icon large icon="mdi-domain" />
        </v-btn>
        {{analytics.n}}
    </div>
</template>

<script setup>
import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()



function increment() {
    analytics.increment()
}

onMounted(() => {
    analytics.page('Actual page!')
})
</script>

<style lang="scss" scoped>

</style>