<script setup>
const tab = ref(null)
</script>

<template>
    <div>
        <v-card class="my-0; py-0">
            <v-tabs v-model="tab" bg-color="#0F559A">
                <v-tab value="one"><span style="color: #FFFFFF; font-weight: bold;">Explore</span></v-tab>
                <v-tab value="two"><span style="color: #FFFFFF; font-weight: bold;">Plan</span></v-tab>
                <v-tab value="three"><span style="color: #FFFFFF; font-weight: bold;">Manage</span></v-tab>
                <v-tab value="profile">
                    <v-icon icon="mdi-account" color="white" />
                </v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <CarnivalShopTabOne />
                    </v-window-item>

                    <v-window-item value="two">
                        Two
                    </v-window-item>

                    <v-window-item value="three">
                        Three
                    </v-window-item>
                    <v-window-item value="profile">
                        <v-container>
                            <v-row>
                                <v-col cols="2" />
                                <v-col cols="8">
                                    <SharedSidebar />
                                </v-col>
                                <v-col cols="2" />
                            </v-row>
                        </v-container>

                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<style lang="scss" scoped></style>

