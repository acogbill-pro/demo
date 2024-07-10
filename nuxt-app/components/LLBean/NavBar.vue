<script setup>
import { useProfileTraitsStore } from '~/stores/profileTraits';
const profiles = useProfileTraitsStore()
const props = defineProps({
    cart: {
        type: Boolean,
        default: false,
    },
})

const showPromo = computed(() => profiles.hasSpecificTrait('promotable'))
</script>



<template>
    <div>
        <v-app-bar id="nav" app color="#ffffff" nuxt>
            <v-toolbar-title>

                <h1>
                    <NuxtLink to="/llbean">
                        <v-img src="/llbean/images/logo.png" width="150" />
                    </NuxtLink>
                    <!--<NuxtLink to="/">
                                                                                                                                                <v-icon small color="white">
                                                                                                                                                    {{ 'mdi-call-split mdi-rotate-180' }}
                                                                                    </v-icon>
                                                                                </NuxtLink>-->
                </h1>
                
            </v-toolbar-title>
            <v-chip v-if="showPromo" class="bg-orange-darken-4" variant="elevated">It's your birthday
                    month! Take 10%
                    off</v-chip>
                    <v-spacer /><v-spacer />
            <!--<v-btn color="secondary" text rounded dense :disabled="!undoable" @click="undo">
                                                                                                        <v-icon>mdi-undo-variant</v-icon>
                                                                                                                                                                </v-btn>
                                                                                                                                                                <v-btn color="secondary" text rounded dense :disabled="!redoable" @click="redo">
                                                                                                                                                                    <v-icon>mdi-redo-variant</v-icon>
                                                                                                                                                                </v-btn>
                                                                                                                                                                <v-spacer />-->
            <v-btn text rounded to="/llbean/account" color="#0B5640" nuxt icon="mdi-account" />
            <LLBeanCartButton v-if="cart" />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>

<style lang="scss" scoped></style>