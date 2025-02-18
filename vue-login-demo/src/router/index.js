import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import HomeView from "@/views/HomeView.vue";
import Login_old from "@/views/Login_old/index.vue";
import test from "@/views/test.vue";

Vue.use(VueRouter)

const routes = [
    {
        redirect: '/login_old',
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/login_old',
        name: 'login_old',
        component: Login_old
    },
    {
        path: '/test',
        name: 'login',
        component: test
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
