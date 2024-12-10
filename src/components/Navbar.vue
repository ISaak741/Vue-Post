<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink, useRoute } from 'vue-router';

const isCurrentRoute = (path) => {
    const currentRoute = useRoute()
    return path === currentRoute.name
}

</script>

<template>
    <nav class="flex justify-center space-x-8 items-center px-4  py-2 bg-sky-600 md:justify-between">
        <RouterLink to="/">
            <img v-bind:src="logo" class="w-10 h-10 rounded-full">
        </RouterLink>
        <div class="flex items-center w-fit space-x-3">
            <RouterLink to="/" class="px-4 py-2 rounded-md font-semibold text-white"> Home
            </RouterLink>
        </div>

    </nav>
</template>