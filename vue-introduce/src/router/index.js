import Vue from 'vue'
import VueRouter from 'vue-router'
import CalculatorLandingPage from "@/views/CalculatorLandingPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CalculatorLandingPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
