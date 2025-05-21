<script setup>

const props = defineProps({
    slug: {
        type: String,
        default: null,
    },
})
const urlString = `url("/cr/images/articles/${props.slug}.png")`

</script>
:style="{'background-image': )'}"
<template>
    <div v-if="slug" class="fullscreen" :style="{ 'background-image': urlString }">
    </div>
</template>

<style lang="scss" scoped>
.fullscreen {
    background-size: 100%;
    background-color: #0b0b0e;
    // height: 100vh;
    height: 100%;
    background-position-x: 0;
    background-position-y: 0;
    background-repeat: no-repeat;
}
</style>