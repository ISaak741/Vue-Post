<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Post from '@/components/Post.vue';

const posts = ref([])
const initialPostLimit = ref(0)

const showMorePosts = () => {
    if (initialPostLimit.value + 3 > posts.value.length)
        initialPostLimit.value = posts.value.length
    else
        initialPostLimit.value += 3
}

const showMorePostsButton = computed(() => {
    return initialPostLimit.value < posts.value.length
})

const numbers = computed(() => {
    return Array.from({ length: initialPostLimit.value }, (_, i) => i);
});

axios.get('http://127.0.0.1:7000/posts').then(response => {
    posts.value = response.data
    initialPostLimit.value = (posts.value.length > 3) ? 3 : posts.value.length
})


</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div class="container mx-auto px-4">
            <!-- Header Section -->
            <header class="mb-8 w-full flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Post List</h1>
                <RouterLink to="/posts/add" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add New Post
                </RouterLink>
            </header>

            <!-- Post Cards Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Post v-for="i in numbers" v-bind:post="posts[i]" v-bind:key="posts[i].id" />
            </div>
            <button v-show="showMorePostsButton" type="button" v-on:click="showMorePosts"
                class="px-5 py-2 text-white font-semibold rounded-lg shadow-md block w-fit mx-auto my-4 bg-sky-500 hover:bg-sky-600">more</button>
        </div>
    </div>
</template>