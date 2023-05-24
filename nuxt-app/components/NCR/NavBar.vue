<script setup>
</script>



<template>
    <div>
        <v-app-bar id="nav" app color="#000000" nuxt>
            <v-toolbar-title>

            <h1>
                <NuxtLink to="/NCR">
                    <v-img src="/NCR/images/logo.png" width="150" />
                </NuxtLink>
                    <!--<NuxtLink to="/">
                                                                                                                                            <v-icon small color="white">
                                                                                                                                                {{ 'mdi-call-split mdi-rotate-180' }}
                                                                                    </v-icon>
                                                                                </NuxtLink>-->
            </h1>
        </v-toolbar-title>
        <!--<v-btn color="secondary" text rounded dense :disabled="!undoable" @click="undo">
                                                                                                        <v-icon>mdi-undo-variant</v-icon>
                                                                                                                                                            </v-btn>
                                                                                                                                                            <v-btn color="secondary" text rounded dense :disabled="!redoable" @click="redo">
                                                                                                                                                                <v-icon>mdi-redo-variant</v-icon>
                                                                                                                                                            </v-btn>
                                                                                                                                                            <v-spacer />-->
            <v-btn text rounded to="/NCR/account" color="white" nuxt icon="mdi-account" />
            <NCRCartButton />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>

<style lang="scss" scoped></style>