<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const postId = useRoute().params.id
const post = ref({
    id: postId,
    title: '',
    content: '',
    author: '',
    tags: []
})

const tag = ref('')

const addTag = () => {
    post.value.tags.push(tag.value)
    tag.value = ''
}

const removeTag = (index) => {
    post.value.tags.splice(index, 1);
}


onMounted(() => {
    axios.get(`http://127.0.0.1:7000/posts/${postId}`)
        .then(response => {
            const data = response.data
            post.value.title = data.title
            post.value.content = data.content
            post.value.author = data.author
            post.value.tags = data.tags
        })
})

const tags = computed(() => {
    return post.value.tags
})
const router = useRouter()

const editPost = () => {
    axios.put(`http://127.0.0.1:7000/posts/${postId}`, post.value).then(response => {
        router.push({ name: 'home' })
    })
}

const deletePost = () => {
    axios.delete(`http://127.0.0.1:7000/posts/${postId}`).then(response => {
        router.push({ name: 'home' })
    })
}

</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div class="container mx-auto px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>
            <form v-on:submit.prevent="editPost" class="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <div class="flex flex-col justify-between items-start">
                    <label for="title" class="font-medium">Post Title</label>
                    <input type="text" id="title"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        v-model="post.title" placeholder="Enter the title">
                </div>

                <div class="flex flex-col justify-between items-start">
                    <label for="content">Post Content</label>
                    <textarea id="content" rows="4"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        v-model="post.content" placeholder="Enter the content">
                    </textarea>
                </div>

                <div class="flex flex-col justify-between items-start">
                    <label for="author" class="font-medium">Post Author</label>
                    <input type="text" id="author"
                        class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        v-model="post.author" placeholder="Enter the author's name">
                </div>

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
                <div class="w-full flex mt-4 justify-center items-center">
                    <button
                        class="px-4 py-2 rounded-md font-medium text-white mx-2 shadow bg-sky-500 hover:bg-sky-700">Edit</button>
                    <button type="button" v-on:click="deletePost"
                        class="px-4 py-2 rounded-md font-medium text-white mx-2 shadow bg-red-500 hover:bg-red-700">Delete</button>
                </div>
            </form>
        </div>
    </div>
</template>