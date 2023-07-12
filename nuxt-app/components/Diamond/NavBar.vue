<script setup>

const topLinks = [
    {
        label: 'Safe Stays',
        url: '/diamond/account',
    },
    {
        label: 'Resorts',
        url: '/diamond/resorts',
    },
    {
        label: 'Deals',
        url: '/diamond/account',
    },
    {
        label: 'Locations',
        url: '/diamond/account',
    },
    {
        label: 'Groups',
        url: '/diamond/account',
    },
    {
        label: 'About',
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
        <v-app-bar id="nav" app color="#FFFFFF" nuxt>
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
            <template v-slot:extension extension-height="50">
                <span v-for="link in topLinks" :key="`${link.label}-nav-link`" class="topLink">
                    <v-btn text rounded :to="link.url" nuxt color="#6F9AD2">
                        {{ link.label }}
                        <v-icon icon="mdi-chevron-down" />
                    </v-btn>


                </span>
                <v-spacer />
                <v-btn text rounded nuxt color="#6F9AD2" to="/diamond/account"><span class="topLink">LOGIN</span></v-btn>
            </template>
            <!-- <CarnivalShopCartButton /> -->
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>


<style lang="scss" scoped>
.topLink {
    color: '#6F9AD2';
    font-weight: 'bold';
}
</style>
