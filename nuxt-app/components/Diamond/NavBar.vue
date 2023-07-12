<script setup>

const topLinks = [
    {
        label: 'Discover Ownership',
        url: '/diamond/account',
    },
    {
        label: 'Resorts & Destinations',
        url: '/diamond/resorts',
    },
    {
        label: 'Plan Your Vacation',
        url: '/diamond/account',
    },
    {
        label: 'Sign In',
        url: '/diamond/account',
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
        <v-app-bar id="nav" app color="#155C7D" nuxt>
            <v-toolbar-title>

                <h1>
                    <NuxtLink to="/diamond/"><v-img src="/diamond/images/logo.png" width="150" /></NuxtLink>
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
            <!-- <v-btn text rounded href="/diamond/" color="white">
                                        Home
                                    </v-btn> -->
            <span v-for="link in topLinks" :key="`${link.label}-nav-link`" class="topLink">
                <v-btn text rounded :to="link.url" nuxt color="white">
                    {{ link.label }}
                    <v-icon icon="mdi-chevron-down" />
                </v-btn>
            </span>
            <CarnivalShopCartButton />
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>


<style lang="scss" scoped>
.topLink {
    color: '#FFFFFF';
    font-weight: 'bold';
}
</style>
