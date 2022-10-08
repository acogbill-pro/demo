<template>
    <div>
        <v-btn @click="firstStore.n++">
            <v-icon large icon="mdi-domain" />
        </v-btn>
        {{firstStore.n}}
    </div>
</template>

<script setup>
import { useFirstStore } from '~/stores/first.js'

const firstStore = useFirstStore()
</script>

<style lang="scss" scoped>

</style>