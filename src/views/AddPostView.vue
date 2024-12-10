<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const form = ref({
    title: '',
    content: '',
    author: '',
    tags: []
});

const tag = ref('')

const tags = computed(() => {
    return form.value.tags
})

const addTag = () => {
    form.value.tags.push(tag.value)
    tag.value = ''
}

const removeTag = (index) => {
    form.value.tags.splice(index, 1);
}


const allowSubmit = computed(() => {
    const titleRules = form.value.title.trim() != '' && form.value.title.length > 4;
    const contentRules = form.value.content.trim() != '' && form.value.content.length > 4;
    const authorRules = form.value.author.trim() != '' && form.value.author.length > 4;
    const tagsRules = form.value.author.length > 1;

    return (titleRules && contentRules && authorRules && tagsRules);
})



const route = useRouter()
const submitForm = () => {
    axios.post('http://127.0.0.1:7000/posts', form.value)
        .then(response => {
            route.push({ name: 'home' })
        })
        .catch(error => {
            console.log(error)
        })
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div class="container mx-auto px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Create a New Post</h1>
            <form @submit.prevent="submitForm" class="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <!-- Title Field -->
                <div>
                    <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
                    <input type="text" id="title" v-model="form.title"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter the title" required />
                </div>

                <!-- Content Field -->
                <div>
                    <label for="content" class="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea id="content" v-model="form.content"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter the content" rows="4" required></textarea>
                </div>

                <!-- Author Name Field -->
                <div>
                    <label for="author" class="block text-gray-700 font-medium mb-2">Author Name</label>
                    <input type="text" id="author" v-model="form.author"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter the author's name" required />
                </div>

                <!-- Tags Field -->
                <div>
                    <label class="block text-gray-700 font-medium mb-2">Tags</label>
                    <label for="tag"
                        class="text-gray-700 font-medium mb-2 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
                        <div class="inline-flex space-x-2 flex-wrap">
                            <div v-for="(tag, index) in tags" :key="tag"
                                class="px-3 w-fit rounded-full space-x-2 flex items-center justify-between bg-blue-500 text-white font-semibold text-sm">
                                <span>
                                    {{ tag }}
                                </span>
                                <span class="text-2xl font-normal cursor-pointer -mt-0.5" v-on:click="removeTag(index)">
                                    &times;
                                </span>
                            </div>
                        </div>
                        <input type="text" id="tag" class="outline-none" v-on:keydown.space="addTag"
                            v-on:keydown.backspace="removeTag(tags.length - 1)" v-model="tag"
                            placeholder="Enter the tags here">


                    </label>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                    <button type="submit" v-bind:disabled="!allowSubmit"
                        v-bind:class="[allowSubmit == false ? 'cursor-not-allowed bg-blue-400' : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75', 'px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md']">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
  