<script setup>
import { useAnalytics } from '~/stores/analytics'

const analytics = useAnalytics()

const collapse = ref(true)

function toggleExpand() {
    collapse.value = !collapse.value
}

onMounted(() => {
})
</script>

<template>
    <v-card class="mb-5">
        <v-card-actions @click="toggleExpand">
            <v-img src="/images/openai-logomark.png" height="20" />
            User Summary
            <v-spacer />
            <v-btn :icon="collapse ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapse">
                Summary will go here
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped></style>