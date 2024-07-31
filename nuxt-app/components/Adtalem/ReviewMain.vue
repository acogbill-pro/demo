<script setup>import { useAnalytics } from '~/stores/analytics.js'
const analytics = useAnalytics()

const contents = ref(null)
const rating = ref(null)

function submit() {
    if (!contents.value || !rating.value) return

    analytics.track('Course Review', { contents: contents.value, rating: rating.value })

    reset()
}

function reset() {
    contents.value = null
    rating.value = null
}
</script>

<template>
    <v-container>
        <v-row>
            <v-card-title>Review a Course</v-card-title>
        </v-row>
        <v-row>
            <v-textarea v-model="contents" block auto-grow clearable rows="2" class="my-0 mt-1" label="Your review" />
        </v-row>
        <v-row>
            <v-radio-group v-model="rating" inline block>
                <template v-slot:label>
                    <div>Your Rating:</div>
                </template>
                <v-radio label="1 (Low)" :value="1"></v-radio>
                <v-radio label="2" :value="2"></v-radio>
                <v-radio label="3" :value="3"></v-radio>
                <v-radio label="4" :value="4"></v-radio>
                <v-radio label="5 (High)" :value="5"></v-radio>
            </v-radio-group>
        </v-row>
        <v-row>
            <v-btn block @click="submit" color="#F4B610">Submit</v-btn>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped></style>