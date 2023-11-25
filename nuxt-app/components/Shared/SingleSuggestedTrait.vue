<script setup>
import { useAnalytics } from '~/stores/analytics';

const props = defineProps({
    objectKey: {
        type: String,
        default: '',
    },
    objectValue: {
        type: Object,
        default: '',
    },
})

const added = ref(false)

function addTrait() {
    const analytics = useAnalytics()

    const traitObject = {}
    traitObject[props.objectKey] = props.objectValue

    analytics.identify(traitObject, true)

    added.value = true
}
</script>

<template>
    <v-row>
        <v-col cols="10">
            <p>{{ objectKey }}: {{ objectValue }}</p>
        </v-col>
        <v-col cols="2"><v-btn variant="text" :icon="added ? 'mdi-check' : 'mdi-plus'" @click="addTrait"
                :disabled="added" /></v-col>
    </v-row>
</template>

<style lang="scss" scoped></style>