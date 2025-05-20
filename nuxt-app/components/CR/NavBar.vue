<script setup>
const props = defineProps({
    cart: {
        type: Boolean,
        default: false,
    },
})
</script>



<template>
    <div>
        <v-app-bar id="nav" app color="#1b1b1b" nuxt>
            <v-toolbar-title>

                <h1>
                    <NuxtLink to="/cr">
                        <v-img src="/cr/images/logo.png" width="150" />
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
            <v-btn text rounded to="/cr/account" color="#06ae4d" nuxt icon="mdi-account" />
            <CRCartButton v-if="cart" />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>

<style lang="scss" scoped></style>