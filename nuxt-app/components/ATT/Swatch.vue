<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'black',
    },
})

</script>

<template>
    <v-radio :value="color">
        <template v-slot:label>
            <v-chip class="ma-2" elevated :color="color">
                {{ color }}
            </v-chip>
        </template>

    </v-radio>
</template>

<style lang="scss" scoped></style>