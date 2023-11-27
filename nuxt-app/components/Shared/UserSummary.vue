<script setup>
import { useProfileStore } from '~/stores/profile'
import { useProfileEventsStore } from '~/stores/profileEvents';
const eventStore = useProfileEventsStore()

const profile = useProfileStore()

const collapseSummary = ref(true)

async function toggleExpand() {
    if (!profile.hasLoaded) return

    collapseSummary.value = !collapseSummary.value

    if (!collapseSummary.value) profile.loadSummary()
}

onMounted(() => {

})
</script>

<template>
    <v-card class="mb-5" v-if="profile.hasLoaded">
        <v-card-actions @click="toggleExpand">
            <v-img src="/images/openai-logomark.png" height="20" />
            User Summary
            <v-spacer />
            <v-btn :icon="collapseSummary ? 'mdi-menu-down' : 'mdi-menu-up'" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="!collapseSummary">
                <!-- <ul>
                    <li v-for="(event, index) in eventStore.cleanEvents" :key="index">
                        {{ event.event }}
                    </li>
                </ul> -->
                <div v-if="profile.summary === ''">
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                </div>
                <div v-else>
                    <p>{{ profile.summary }}</p>
                </div>

            </v-card-text>
        </v-expand-transition>
    </v-card>
    <v-card class="mb-5" v-if="profile.hasLoaded && profile.nba">
        <v-card-actions>
            <v-img src="/images/openai-logomark.png" height="20" />
            Next Best Action
            <v-spacer />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text>
                <p>{{ profile.nba }}</p>
            </v-card-text>
        </v-expand-transition>
    </v-card>
    <SharedSuggestedTraits :traits-object="profile.inferred" v-if="profile.hasLoaded && profile.inferred" />
</template>

<style lang="scss" scoped></style>