<script setup>
import { computed, ref } from 'vue';
import { defineProps } from 'vue';

const { post } = defineProps({
    post: {
        type: Object,
        required: true,
    },
});

const showMore = ref(true)

const toggleContent = () => {
    showMore.value = !showMore.value
}

const postContent = computed(() => {
    if (showMore.value)
        return post.content.substring(0, (post.content.length > 255) ? 100 : 10) + '...';
    return post.content;
});


</script>

<template>
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <RouterLink v-bind:to="`/posts/${post.id}`">
            <img src="https://via.placeholder.com/300" alt="Post Image" class="w-full h-48 object-cover">
        </RouterLink>

        <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-900">{{ post.title }}</h2>
            <p class="mt-2 text-gray-600">{{ postContent }} <button type="button"
                    class="text-blue-500 hover:underline-offset-2" v-on:click="toggleContent">{{
                        showMore ?
                        'more' : 'less' }}</button>
            </p>
            <div class="mt-2">
                <span v-for="(tag, index) in post.tags" :key="post.id + '-' + index"
                    class="px-4 py-1 bg-gray-500 text-white font-semibold text-sm mr-1 rounded-full">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>
