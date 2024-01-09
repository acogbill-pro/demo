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
            <ul>
                <li v-for="[key, value] in Object.entries(traitStore.cleanTraits)" :key="key">{{ key + ': ' +
                    JSON.stringify(value)
                }}
                </li>
            </ul>
            <SharedProfileAddTrait class="my-5" />
            <SharedProfileAddSmartTrait class="my-5" />
            <SharedProfileAddDateTrait class="my-5" />
        </v-card-text>
    </ClientOnly>
</template>

<style lang="scss" scoped></style>