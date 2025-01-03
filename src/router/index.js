import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PostView from "@/views/PostView.vue";
import AddPostView from "@/views/AddPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts/add",
      name: "post-add",
      component: AddPostView,
    },
    {
      path: "/posts/:id",
      name: "post-detail",
      component: PostView,
    },
  ],
});

export default router;
