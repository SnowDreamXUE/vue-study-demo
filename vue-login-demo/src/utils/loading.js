import Vue from "vue"
import PageLoading from "@/components/PageLoading.vue"

class LoadingUtils {
    constructor() {
        this.loadingInstance = null
    }

    // 初始化加载组件
    init() {
        // 全局注册组件
        Vue.component("PageLoading", PageLoading)

        // 创建全局加载实例
        const LoadingConstructor = Vue.extend(PageLoading)
        this.loadingInstance = new LoadingConstructor()
        this.loadingInstance.$mount()
        document.body.appendChild(this.loadingInstance.$el)

        // 添加到Vue原型
        Vue.prototype.$pageLoading = this.loadingInstance

        return this.loadingInstance
    }

    // 设置路由守卫
    setupRouter(router, options = {}) {
        const defaultOptions = {
            routeChangeDelay: 300,
        }
        const config = { ...defaultOptions, ...options }

        router.beforeEach((to, from, next) => {
            if (to.path !== from.path) {
                this.loadingInstance.show()
            }
            next()
        })

        router.afterEach(() => {
            Vue.nextTick(() => {
                setTimeout(() => {
                    this.loadingInstance.hide()
                }, config.routeChangeDelay)
            })
        })
    }

    // 处理首次加载
    handleFirstLoad(options = {}) {
        const defaultOptions = {
            firstLoadDelay: 600,
        }
        const config = { ...defaultOptions, ...options }

        // 应用启动时显示加载动画
        if (document.readyState === "loading") {
            this.loadingInstance.show()
        }

        // 页面加载完成处理
        const handlePageLoad = () => {
            if (document.readyState !== "complete") {
                const handleLoad = () => {
                    setTimeout(() => {
                        this.loadingInstance.hide()
                    }, config.firstLoadDelay)
                    window.removeEventListener("load", handleLoad)
                }
                window.addEventListener("load", handleLoad)
            } else {
                setTimeout(() => {
                    this.loadingInstance.hide()
                }, 1000)
            }
        }

        return handlePageLoad
    }

    // 手动显示加载
    show() {
        if (this.loadingInstance) {
            this.loadingInstance.show()
        }
    }

    // 手动隐藏加载
    hide() {
        if (this.loadingInstance) {
            this.loadingInstance.hide()
        }
    }

    // 获取加载实例
    getInstance() {
        return this.loadingInstance
    }
}

// 创建单例实例
const loadingUtils = new LoadingUtils()

export default loadingUtils
