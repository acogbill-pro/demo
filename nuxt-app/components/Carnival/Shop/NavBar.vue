<script setup>

const topLinks = [
    {
        label: 'Shop',
        url: '/Carnival/shop',
    },
    {
        label: 'Account',
        url: '/account',
    },
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
        <v-app-bar id="nav" app color="#0F559A" nuxt>
            <v-toolbar-title>

                <h1>
                    <v-img src="/Carnival/images/logo.png" width="150" />
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
            <v-btn text rounded href="/">
                Home
            </v-btn>
            <v-btn v-for="link in topLinks" :key="`${link.label}-nav-link`" text rounded :to="link.url" nuxt>
                {{ link.label }}
            </v-btn>
            <CarnivalShopCartButton />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>


<style lang="scss" scoped></style>
