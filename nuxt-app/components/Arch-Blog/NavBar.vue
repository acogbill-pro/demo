<script setup>
import { useRoute } from 'vue-router'
import { useProfileTraitsStore } from '~/stores/profiles'

const profile = useProfileTraitsStore()

const route = useRoute()

const internalLink = computed(() => {
    if (route.path !== '/') {
        return {
            label: 'Blog',
            url: '/',
        }
    } else {
        return {
            label: 'Login',//profile.hasTraits ? 'Account' : 'Login',
            url: '/account',
        }
    }
})

const topLinks = computed(() => {
    return [
        {
            label: 'Login',
            url: '/account',
        },
    ]
})

const showAuth = computed(() => {
    return false
})

function login() {
    console.log('would log in')
}

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
onMounted(() => {
    //console.log(user)
})
</script>

<template>
    <div>
        <v-app-bar id="nav" app color="primary" dark nuxt>
            <v-toolbar-title>
                <h1>
                    The Blog
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
            <v-btn color="secondary" text rounded to="/" nuxt>
                Blog
            </v-btn>
            <v-btn color="secondary" text rounded href="/shop" target="_blank">
                Shop
            </v-btn>
            <v-btn v-for="link in topLinks" :key="`${link.label}-nav-link`" color="secondary" text rounded :to="link.url"
                nuxt>
                {{ link.label }}
            </v-btn>
            <v-btn @click="login" text rounded color="secondary" v-if="!user">
                Auth
            </v-btn>
            <!--<v-btn color="secondary" text rounded @click="emit('toggleTheme', 'nav bar')">Toggle Theme</v-btn>-->
        </v-app-bar>
    </div>
</template>


<style lang="scss" scoped></style>
