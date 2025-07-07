import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import HomeView from "@/views/HomeView.vue";
import Login_old from "@/views/Login_old/index.vue";
import test from "@/views/test.vue";
import login_register from "@/views/login_register.vue";

Vue.use(VueRouter)

const routes = [
    {
        redirect: '/login_register',
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
    },
    {
        path: '/login_register',
        name: 'login_register',
        component: login_register
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
