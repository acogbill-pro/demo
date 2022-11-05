<script setup>
import { useArticleCatalog } from '~/stores/articles';
const articles = useArticleCatalog()

const dialog = ref(false)

const props = defineProps({
    article: {
        type: Object,
        default: { ID: '0001', title: 'Article Loading', fullText: 'Article Loading' }
    }
})

function readArticle() {
    articles.markAsRead(props.article.ID)
}

const isFavorite = computed(() => articles.favorites.has(props.article.ID))

function favorite() {
    if (isFavorite.value) {
        articles.removeFavorite(props.article.ID)

    } else {
        articles.addFavorite(props.article.ID)
    }
}
</script>

<template>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
            <v-btn @click="readArticle" v-bind="props">
                Read Article
            </v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn dark text @click="favorite">
                    <v-icon icon="mdi-heart" :color="isFavorite ? 'red' : 'gray'"></v-icon>
                </v-btn>
                <v-toolbar-title>{{ props.article.title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                {{ props.article.fullText }}
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<style lang="scss" scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>