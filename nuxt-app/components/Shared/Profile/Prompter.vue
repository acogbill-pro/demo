<script setup>
import { useProfileStore } from '~/stores/profile'
const profile = useProfileStore()

const loading = ref(false)
// const promptString = 'You are a human who works with customers to find them the right mortgage and get them excited about working with Rocket Mortgage. Reference their city by looking up the zip code and make it feel local by referencing specific neighborhoods and points of interest.'
const promptString = 'You are a human store associate, with the goal of getting a customer excited about the store, the products it sells, the product or products they own, the categories of products they are interested in, and give them personalized reasons to spend time in the store.'
const prompt = ref('')

async function submitPrompt() {
    if (!profile.hasLoaded || prompt.value === '') return
    loading.value = true
    profile.loadOther(prompt.value)
}

function reset() {
    prompt.value = ''
    loading.value = false
    profile.other = ''
    prompt.value = promptString
}

onMounted(() => {
    prompt.value = promptString
})
</script>

<template>
    <v-card class="mb-5" v-if="profile.hasLoaded">
        <v-card-actions>
            <v-img src="/images/openai-logomark.png" height="20" />
            <b>Prompt</b>
            <v-spacer />
            <v-btn v-if="profile.other" icon="mdi-refresh" @click="reset" variant="plain" />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text v-if="profile.other === ''">
                <div v-if="!loading">
                    <v-container>
                        <v-form>
                            <v-row>

                                <v-col cols="10">
                                    <v-textarea v-model="prompt" density="compact" variant="solo" hide-details
                                        label="Prompt" />
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon="mdi-check" @click="submitPrompt" variant="plain" block
                                        :disabled="prompt === ''" />
                                </v-col>

                            </v-row>
                        </v-form>
                    </v-container>
                </div>
                <div v-else>
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                </div>
            </v-card-text>
            <v-card-text v-else>
                {{ profile.other }}

            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped></style>