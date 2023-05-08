<script setup>
const showSidebar = ref(false)
</script>

<template>
    <v-container no-gutters>
        <v-row>
            <v-col :cols="showSidebar ? 9 : 12">
                <CarnivalShopHomeTabs />
            </v-col>
            <v-col v-if="showSidebar" cols="3">
                <SharedSidebar />
            </v-col>
        </v-row>

    </v-container>
</template>

<style lang="scss" scoped></style>