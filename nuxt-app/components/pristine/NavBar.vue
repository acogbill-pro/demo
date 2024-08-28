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
        <v-app-bar id="nav" app color="#ffffff" nuxt>
            <v-toolbar-title>

                <h1>
                    <NuxtLink to="/pristine">
                        <v-img src="/pristine/images/smoothie-king-logo.png" width="300" />
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
            <v-btn text rounded to="/pristine/account" color="#B5101A" nuxt icon="mdi-account" />
            <pristineCartButton v-if="cart" />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>

<style lang="scss" scoped></style>