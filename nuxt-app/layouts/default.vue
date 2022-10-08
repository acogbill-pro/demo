<template>
    <div class="default-layout">
        <v-app>
            <v-main>
                <slot />
            </v-main>
        </v-app>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss" scoped>

</style>