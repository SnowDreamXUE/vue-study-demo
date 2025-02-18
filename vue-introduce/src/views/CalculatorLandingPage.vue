<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <!-- Navigation Bar -->
        <nav class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex justify-between items-center">
                    <div class="flex space-x-4">
                        <!-- Logo -->
                        <div>
                            <a href="#" class="flex items-center py-5 px-2 text-white">
                                <span class="font-bold text-xl">SuperCalc</span>
                            </a>
                        </div>
                    </div>
                    <!-- Navigation Links - Desktop -->
                    <div class="hidden md:flex items-center space-x-1">
                        <a href="#features" class="py-5 px-3 text-white hover:text-green-400 transition duration-300">功能</a>
                        <a href="#why-choose" class="py-5 px-3 text-white hover:text-green-400 transition duration-300">为什么选择我们</a>
                        <a href="#about" class="py-5 px-3 text-white hover:text-green-400 transition duration-300">关于我</a>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button @click="toggleMenu" class="mobile-menu-button">
                            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile menu -->
            <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" class="md:hidden">
                <a href="#features" class="block py-2 px-4 text-sm hover:bg-blue-700">功能</a>
                <a href="#why-choose" class="block py-2 px-4 text-sm hover:bg-blue-700">为什么选择我们</a>
                <a href="#about" class="block py-2 px-4 text-sm hover:bg-blue-700">关于我</a>
            </div>
        </nav>

        <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <!-- Header -->
            <header class="text-center mb-12">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">SuperCalc</h1>
                <p class="text-lg sm:text-xl">高级计算器 - 简单而强大</p>
            </header>

            <!-- Main Content -->
            <main>
                <!-- Hero Section -->
                <section class="bg-white bg-opacity-10 rounded-lg p-6 sm:p-8 mb-12 backdrop-filter backdrop-blur-lg">
                    <div class="flex flex-col md:flex-row items-center">
                        <div class="md:w-1/2 mb-6 md:mb-0">
                            <h2 class="text-2xl sm:text-3xl font-semibold mb-4">您的终极计算助手</h2>
                            <p class="mb-6">
                                SuperCalc 不仅仅是一个计算器，它是您的数学伙伴。无论是简单的日常计算还是复杂的科学运算，SuperCalc 都能胜任。
                            </p>
                            <button
                                    @click="handleCtaClick"
                                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full inline-block transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                立即使用 SuperCalc
                            </button>
                        </div>
                        <div class="md:w-1/2 mt-6 md:mt-0">
                            <img src="https://www.helloimg.com/i/2024/09/30/66fa59e4670fe.png" alt="SuperCalc 界面预览" class="rounded-lg shadow-lg w-full" />
                        </div>
                    </div>
                </section>

                <!-- Features -->
                <section id="features" class="bg-white bg-opacity-10 rounded-lg p-6 sm:p-8 mb-12 backdrop-filter backdrop-blur-lg">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-6">功能特点</h2>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <li v-for="(feature, index) in features" :key="index" class="flex items-center">
                            <svg class="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            {{ feature }}
                        </li>
                    </ul>
                </section>

                <!-- Why Choose SuperCalc -->
                <section id="why-choose" class="bg-white bg-opacity-10 rounded-lg p-6 sm:p-8 mb-12 backdrop-filter backdrop-blur-lg">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-6">为什么选择 SuperCalc？</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div v-for="(reason, index) in reasons" :key="index" class="text-center">
                            <svg class="w-12 h-12 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="reason.icon"></svg>
                            <h3 class="text-xl font-semibold mb-2">{{ reason.title }}</h3>
                            <p>{{ reason.description }}</p>
                        </div>
                    </div>
                </section>

                <!-- About Me -->
                <section id="about" class="bg-white bg-opacity-10 rounded-lg p-6 sm:p-8 mb-12 backdrop-filter backdrop-blur-lg">
                    <h2 class="text-2xl sm:text-3xl font-semibold mb-6">关于我</h2>
                    <div class="flex flex-col md:flex-row items-center">
                        <div class="md:w-1/3 mb-6 md:mb-0">
                            <img src="https://avatars.githubusercontent.com/u/117718092?v=4" alt="开发者头像" class="rounded-full w-32 h-32 sm:w-48 sm:h-48 mx-auto" />
                        </div>
                        <div class="md:w-2/3 md:pl-8">
                            <h3 class="text-xl sm:text-2xl font-semibold mb-4">SnowDreamXUE</h3>
                            <p class="mb-4">
                                一只只会摸鱼的猫猫，只想在雪夜的樱花树下做个好梦
                            </p>
                            <div class="flex justify-center md:justify-start space-x-4">
                                <a href="https://github.com/SnowDreamXUE" target="_blank" rel="noopener noreferrer" class="flex items-center text-white hover:text-green-400 transition duration-300">
                                    <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            <footer class="text-center mt-12">
                <p>&copy; 2023 SuperCalc. 保留所有权利。</p>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const features = [
    '基本四则运算',
    '百分比计算',
    '三角函数 (sin, cos, tan)',
    '指数和对数运算',
    '响应式设计',
]

const reasons = [
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
        title: '快速高效',
        description: '优化的算法确保计算速度快如闪电。'
    },
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',
        title: '随处可用',
        description: '响应式设计，在任何设备上都能完美运行。'
    },
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>',
        title: '项目开源',
        description: '代码公开透明，欢迎社区贡献和改进。'
    }
]

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const handleCtaClick = () => {
    window.location.href = 'http://8.138.16.215:9999/'
}
</script>

<style scoped>
/* 如果需要任何额外的自定义样式，可以在这里添加 */
</style>
