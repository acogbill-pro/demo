<script setup>

const props = defineProps({
    traitsObject: {
        type: Object,
        default: {},
    },
})

</script>

<template>
    <v-card class="mb-5">
        <v-card-actions>
            <v-img src="/images/openai-logomark.png" height="20" />
            Suggested Traits
            <v-spacer />
        </v-card-actions>
        <v-expand-transition>
            <v-card-text>
                <v-container>
                    <SharedSingleSuggestedTrait v-for="[key, value] in Object.entries(traitsObject)" :key="key"
                        :object-key="key" :object-value="value" />
                </v-container>
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<style lang="scss" scoped></style>