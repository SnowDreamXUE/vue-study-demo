import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import LoadingUtils from "@/utils/loading";

Vue.config.productionTip = false
Vue.use(ElementUI);

// 初始化加载组件
LoadingUtils.init()

// 设置路由守卫
LoadingUtils.setupRouter(router, {
  routeChangeDelay: 300  // 可选配置
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 处理首次加载
    const handlePageLoad = LoadingUtils.handleFirstLoad({
      firstLoadDelay: 600  // 可选配置
    })
    handlePageLoad()
  }
}).$mount('#app')
