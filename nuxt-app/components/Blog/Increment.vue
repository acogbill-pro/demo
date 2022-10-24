<script setup>
import { useMainStore } from '~/stores/main.js'
const store = useMainStore()

function increment() {
    store.increment()
}
</script>

<template>
    <div>
        <v-btn @click="increment()">
            <v-icon large icon="mdi-plus" />
        </v-btn>
        {{store.n}}
    </div>
</template>

<style lang="scss" scoped>

</style>