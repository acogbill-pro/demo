<script setup>
onBeforeMount(() => {
  const nuxtApp = useNuxtApp();
  console.log(nuxtApp)
})


</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>