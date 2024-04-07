<script setup>
import { useAnalytics } from '~/stores/analytics.js'
import { useProfileTraitsStore } from '~/stores/profileTraits.js'
const analytics = useAnalytics()
const traitStore = useProfileTraitsStore()
</script>

<template>
    <ClientOnly>
        <v-card-text>
            <p class="mb-5">Anon ID: {{ analytics.anonymousID }}</p>
            <ul class="ml-2">
                <li v-for="[key, value] in Object.entries(traitStore.cleanTraits)" :key="key" class="mb-1">
                    {{ key }}
                    <b>{{ ': ' +
                        value
                    }}</b>
                </li>
            </ul>
            <v-divider class="mt-8" />
            <SharedProfileAddTrait class="my-5" />
            <v-divider />
            <SharedProfileAddSmartTrait class="my-5" />
            <v-divider />
            <SharedProfileAddDateTrait class="my-5" />
        </v-card-text>
    </ClientOnly>
</template>

<style lang="scss" scoped></style>