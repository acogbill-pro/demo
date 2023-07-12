<script setup>
</script>

<template>
    <ClientOnly>
        <SharedEventList />
        <SharedProfile />
        <NuxtLink to="/pristine/sms">Send SMS</NuxtLink>
        <!-- <SharedMessaging />
                <SharedSetup /> -->
    </ClientOnly>
</template>

<style lang="scss" scoped></style>