<script setup>
import { useArticleCatalog } from '~/stores/articles.js'

const articles = useArticleCatalog()

const props = defineProps({
    article: {
        type: Object,
        default: { ID: '0001', title: 'Article Loading', fullText: 'Article Loading' }
    }
})

const isFavorite = computed(() => articles.favoriteIDs.has(props.article.ID))

function favorite() {
    if (isFavorite.value) {
        articles.removeFavorite(props.article.ID)

    } else {
        articles.addFavorite(props.article.ID)
    }
}
</script>

<template>
    <v-card class="mb-10">
        <v-card-title>{{ props.article.title }}</v-card-title>
        <v-card-text>
            {{ props.article.fullText }}
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="favorite()">
                <v-icon icon="mdi-heart" :color="isFavorite ? 'red' : 'gray'"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" scoped>

</style>