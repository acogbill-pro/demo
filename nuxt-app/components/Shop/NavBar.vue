<script setup>
import { useProfileStore } from '~/stores/profiles'

const profiles = useProfileStore()

//const linkText = computed(() => profiles.hasTraits ? 'Account' : 'Login')

const topLinks = [
    {
        label: 'Shop',
        url: '/shop',
    },
    /*{
        label: linkText.value,
        url: '/account',
    },*/
]

/*undoRedoStore.startSaving()
const undoable = ref(false)
const redoable = ref(false)
const drawer = ref(false)
function undo() {
    console.log('would undo')
}
function redo() {
    console.log('would redo')
}*/
</script>

<template>
    <div>
        <v-app-bar id="nav" app color="#f22f46" nuxt>
            <v-toolbar-title>
                <h1>
                    ParentShop
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
            <v-btn text rounded href="/" target="_blank">
                Blog
            </v-btn>
            <v-btn v-for="link in topLinks" :key="`${link.label}-nav-link`" text rounded :to="link.url" nuxt>
                {{ link.label }}
            </v-btn>
            <ShopCart />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>


<style lang="scss" scoped>

</style>
