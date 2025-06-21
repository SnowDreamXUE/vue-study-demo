<template>
  <div class="app-container" ref="appContainer">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <!-- 流动的色彩圆圈 -->
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-circle circle-3"></div>
      <div class="floating-circle circle-4"></div>

      <!-- 流动的色彩波浪 -->
      <div class="color-wave wave-1"></div>
      <div class="color-wave wave-2"></div>
      <div class="color-wave wave-3"></div>
    </div>

    <!-- 其他内容保持不变... -->
    <!-- 右上角按钮组 -->
    <div class="top-buttons">
      <!-- 搜索按钮和搜索框 -->
      <div class="search-system" @click.stop>
        <div class="search-input-container" :class="{ 'expanded': searchExpanded }">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索网站..."
              class="search-input"
              ref="searchInput"
              @focus="onSearchFocus"
              @blur="onSearchBlur"
          />
          <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-btn"
          >
            <X class="icon" />
          </button>
        </div>

        <button class="search-btn" @click="toggleSearch">
          <Search class="icon" />
        </button>
      </div>

      <!-- 分类按钮 -->
      <div class="category-system">
        <button
            class="category-btn"
            :class="{ 'expanded': sidebarOpen }"
            @click.stop="toggleSidebar"
        >
          <Filter class="icon" />
          <div class="ripple-effect" :class="{ 'active': rippleActive }"></div>
        </button>

        <!-- 分类侧边栏 -->
        <div
            class="category-sidebar-new"
            :class="{ 'open': sidebarOpen }"
            @click="handleSidebarBackgroundClick"
        >
          <!-- 侧边栏面板 -->
          <div class="sidebar-panel" @click.stop>
            <!-- 侧边栏头部 -->
            <div class="sidebar-header">
              <div class="header-content">
                <Filter class="header-icon" />
                <h3 class="sidebar-title">分类筛选</h3>
              </div>
              <button class="close-btn" @click="closeSidebar">
                <X class="icon" />
              </button>
            </div>

            <!-- 分类列表 -->
            <div class="categories-container">
              <div class="categories-grid">
                <button
                    v-for="(category, index) in categories"
                    :key="category"
                    @click="selectCategory(category)"
                    :class="['category-chip', {
                      'active': selectedCategory === category,
                      'animate-in': sidebarOpen
                    }]"
                    :style="{ 'animation-delay': `${index * 50}ms` }"
                >
                  <span class="chip-text">{{ category }}</span>
                  <div v-if="selectedCategory === category" class="active-dot"></div>
                </button>
              </div>
            </div>

            <!-- 统计信息 -->
            <div class="sidebar-stats">
              <div class="stat-item">
                <span class="stat-number">{{ filteredSites.length }}</span>
                <span class="stat-label">个网站</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ categories.length - 1 }}</span>
                <span class="stat-label">个分类</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content" @click="handleMainContentClick">
      <!-- 头部 -->
      <header class="header">
        <h1 class="main-title">艺术导航</h1>
        <p class="subtitle">发现美好的网络世界</p>
      </header>

      <!-- 当前分类显示 -->
      <div v-if="selectedCategory !== '全部'" class="current-category">
        <span class="category-label">当前分类：</span>
        <span class="category-name">{{ selectedCategory }}</span>
        <button @click="selectedCategory = '全部'" class="clear-category">
          <X class="icon" />
        </button>
      </div>

      <!-- 网站卡片网格 -->
      <div class="sites-grid">
        <SiteCard
            v-for="site in filteredSites"
            :key="site.id"
            :site="site"
            @click="openSite"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredSites.length === 0" class="empty-state">
        <div class="empty-icon">
          <Search class="icon" />
        </div>
        <h3 class="empty-title">未找到相关网站</h3>
        <p class="empty-text">尝试调整搜索关键词或选择其他分类</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 脚本内容保持完全不变...
import {computed, nextTick, onMounted, onUnmounted, ref} from 'vue'
import {Filter, Search, X} from 'lucide-vue-next'
import SiteCard from '../components/SiteCard.vue'
import {sitesData as importedSitesData} from '../data/sitesData.js'

// ==================== 数据管理 ====================
const sitesData = ref([])

// 从导入的数据加载
const loadSitesData = () => {
  try {
    sitesData.value = importedSitesData.sites
    // console.log('数据加载成功:', sitesData.value.length, '个网站')
  } catch (error) {
    // console.error('加载数据失败:', error)
    sitesData.value = []
  }
}

// ==================== 响应式状态 ====================
const searchQuery = ref('')
const selectedCategory = ref('全部')
const sidebarOpen = ref(false)
const searchExpanded = ref(false)
const appContainer = ref(null)
const searchInput = ref(null)
const rippleActive = ref(false)

// ==================== 计算属性 ====================
const categories = computed(() => {
  return ['全部', ...new Set(sitesData.value.map(site => site.category))]
})

const filteredSites = computed(() => {
  let filtered = sitesData.value

  if (selectedCategory.value !== '全部') {
    filtered = filtered.filter(site => site.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(site =>
        site.name.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

// ==================== 方法 ====================
const openSite = (url) => {
  window.open(url, '_blank')
}

const clearSearch = () => {
  searchQuery.value = ''
}

const toggleSearch = async () => {
  searchExpanded.value = !searchExpanded.value
  if (searchExpanded.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const onSearchFocus = () => {
  searchExpanded.value = true
}

const onSearchBlur = () => {
  // 延迟处理，避免点击清除按钮时搜索框收缩
  setTimeout(() => {
    if (!searchQuery.value.trim()) {
      searchExpanded.value = false
    }
  }, 200)
}

const toggleSidebar = () => {
  rippleActive.value = true
  setTimeout(() => {
    rippleActive.value = false
  }, 600)

  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const selectCategory = (category) => {
  selectedCategory.value = category
  // 在移动端选择分类后自动关闭侧边栏
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      closeSidebar()
    }, 300)
  }
}

// 处理侧边栏背景点击（关闭侧边栏）
const handleSidebarBackgroundClick = () => {
  closeSidebar()
}

// 处理主内容区点击（关闭所有打开的面板）
const handleMainContentClick = () => {
  if (sidebarOpen.value) {
    sidebarOpen.value = false
  }

  if (searchExpanded.value && !searchQuery.value.trim()) {
    searchExpanded.value = false
  }
}

// 键盘事件处理
const handleKeyDown = (event) => {
  // ESC键关闭所有打开的面板
  if (event.key === 'Escape') {
    if (sidebarOpen.value) {
      sidebarOpen.value = false
    }
    if (searchExpanded.value && !searchQuery.value.trim()) {
      searchExpanded.value = false
    }
  }
}

// 全局点击事件处理（备用方案）
const handleDocumentClick = (event) => {
  // 检查点击是否发生在分类按钮或侧边栏内部
  const categoryButton = event.target.closest('.category-btn')
  const sidebarPanel = event.target.closest('.sidebar-panel')

  // 如果不是点击分类按钮或侧边栏内部，且侧边栏是打开的，则关闭侧边栏
  if (!categoryButton && !sidebarPanel && sidebarOpen.value) {
    sidebarOpen.value = false
  }

  // 处理搜索框的点击外部关闭
  const searchSystem = event.target.closest('.search-system')
  if (!searchSystem && searchExpanded.value && !searchQuery.value.trim()) {
    searchExpanded.value = false
  }
}

// ==================== 生命周期 ====================
onMounted(() => {
  loadSitesData()
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeyDown)
  // 添加全局点击事件监听
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  // 清理事件监听
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fce4ec 0%, #e3f2fd 50%, #f3e5f5 100%);
  position: relative;
  overflow-x: hidden;
}

.background-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ==================== 流动的色彩圆圈 ==================== */
.floating-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px); /* 从 60px 减少到 40px，让圆圈更清晰 */
  opacity: 0.6; /* 从 0.4 增加到 0.6，更明显 */
  animation: float 20s ease-in-out infinite;
  z-index: 0;
}

.circle-1 {
  top: -160px;
  right: -160px;
  width: 320px;
  height: 320px;
  background: linear-gradient(135deg, #f8bbd9 0%, #81d4fa 100%);
  animation-delay: 0s;
}

.circle-2 {
  bottom: -160px;
  left: -160px;
  width: 320px;
  height: 320px;
  background: linear-gradient(135deg, #81d4fa 0%, #ce93d8 100%);
  animation-delay: -5s;
}

.circle-3 {
  top: 20%;
  left: 10%;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  animation-delay: -10s;
}

.circle-4 {
  bottom: 30%;
  right: 15%;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  animation-delay: -15s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(30px, -30px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) rotate(180deg) scale(0.9);
  }
  75% {
    transform: translate(-30px, -10px) rotate(270deg) scale(1.05);
  }
}

/* ==================== 流动的色彩波浪 ==================== */
.color-wave {
  position: absolute;
  width: 200%;
  height: 200px;
  opacity: 0.25; /* 从 0.1 增加到 0.25，更明显 */
  animation: wave 15s ease-in-out infinite;
  z-index: 0;
}

.wave-1 {
  top: 20%;
  left: -50%;
  background: linear-gradient(90deg,
  transparent 0%,
  rgba(248, 187, 217, 0.8) 25%, /* 增加颜色饱和度 */
  rgba(129, 212, 250, 0.8) 50%,
  rgba(206, 147, 216, 0.8) 75%,
  transparent 100%);
  animation-delay: 0s;
  transform: rotate(-10deg);
}

.wave-2 {
  top: 60%;
  left: -50%;
  background: linear-gradient(90deg,
  transparent 0%,
  rgba(129, 212, 250, 0.8) 25%, /* 增加颜色饱和度 */
  rgba(255, 236, 210, 0.8) 50%,
  rgba(168, 237, 234, 0.8) 75%,
  transparent 100%);
  animation-delay: -5s;
  transform: rotate(5deg);
}

.wave-3 {
  top: 80%;
  left: -50%;
  background: linear-gradient(90deg,
  transparent 0%,
  rgba(206, 147, 216, 0.8) 25%, /* 增加颜色饱和度 */
  rgba(248, 187, 217, 0.8) 50%,
  rgba(252, 182, 159, 0.8) 75%,
  transparent 100%);
  animation-delay: -10s;
  transform: rotate(-5deg);
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translateX(-25%) rotate(calc(var(--rotation, 0deg) + 5deg));
  }
}

/* 其他样式保持完全不变... */
/* ==================== 右上角按钮组 ==================== */
.top-buttons {
  position: fixed;
  top: 20px;
  right: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  z-index: 1000;
}

/* ==================== 搜索系统 - 左侧展开 ==================== */
.search-system {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input-container {
  position: relative;
  width: 0;
  overflow: hidden;
  transition: width 0.4s ease;
  order: 1;
}

.search-input-container.expanded {
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  border-color: #81d4fa;
  box-shadow: 0 0 0 3px rgba(129, 212, 250, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
}

.search-input::placeholder {
  color: #999;
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

.search-btn {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #666;
  flex-shrink: 0;
  order: 2;
}

.search-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
  color: #333;
}

/* ==================== 分类系统 ==================== */
.category-system {
  position: relative;
  display: flex;
  align-items: center;
}

.category-btn {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #666;
  position: relative;
  overflow: hidden;
}

.category-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
  color: #333;
}

.category-btn.expanded {
  background: linear-gradient(135deg, #f8bbd9 0%, #81d4fa 100%);
  color: white;
  transform: scale(0.95);
}

/* 波纹效果 */
.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
  pointer-events: none;
}

.ripple-effect.active {
  width: 120px;
  height: 120px;
}

/* 分类侧边栏 */
.category-sidebar-new {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0);
}

.category-sidebar-new.open {
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.1);
}

/* 侧边栏面板 */
.sidebar-panel {
  position: absolute;
  top: 110px;
  right: 40px;
  transform: translateY(-20px) scale(0.9);
  width: 350px;
  max-height: calc(100vh - 150px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  pointer-events: none;
}

.category-sidebar-new.open .sidebar-panel {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
}

/* 侧边栏头部 */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.sidebar-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #333;
  background: linear-gradient(135deg, #e91e63 0%, #2196f3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #666;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
  color: #333;
}

/* 分类容器 */
.categories-container {
  padding: 16px 24px;
  max-height: 300px;
  overflow-y: auto;
  /* 滚动条样式已移至 scrollbar.css */
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

/* 分类芯片 */
.category-chip {
  position: relative;
  padding: 10px 14px;
  background: rgba(248, 187, 217, 0.1);
  border: 2px solid transparent;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  opacity: 0;
  transform: translateY(15px);
}

.category-chip.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.category-chip:hover {
  background: rgba(248, 187, 217, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(248, 187, 217, 0.3);
}

.category-chip.active {
  background: linear-gradient(135deg, #f8bbd9 0%, #81d4fa 100%);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(248, 187, 217, 0.4);
}

.chip-text {
  flex: 1;
}

.active-dot {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

/* 统计信息 */
.sidebar-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px 24px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(248, 187, 217, 0.05);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e91e63;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 11px;
  color: #999;
}

/* ==================== 主内容样式 ==================== */
.main-content {
  padding: 32px;
  min-height: 100vh;
  position: relative;
  z-index: 10;
}

.header {
  text-align: center;
  margin-bottom: 48px;
  margin-top: 60px;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #e91e63 0%, #2196f3 50%, #9c27b0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% {
    filter: drop-shadow(0 0 10px rgba(233, 30, 99, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(33, 150, 243, 0.3));
  }
}

.subtitle {
  color: #666;
  font-size: 1.125rem;
  margin: 0;
}

/* 当前分类显示 */
.current-category {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: rgba(248, 187, 217, 0.1);
  border-radius: 50px;
  width: fit-content;
  border: 1px solid rgba(248, 187, 217, 0.3);
}

.category-label {
  font-size: 14px;
  color: #666;
}

.category-name {
  font-size: 14px;
  font-weight: 600;
  color: #e91e63;
}

.clear-category {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(233, 30, 99, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #e91e63;
}

.clear-category:hover {
  background: rgba(233, 30, 99, 0.2);
  transform: scale(1.1);
}

/* ==================== 网站卡片网格样式 ==================== */
.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* ==================== 空状态样式 ==================== */
.empty-state {
  text-align: center;
  padding: 64px 0;
}

.empty-icon {
  width: 96px;
  height: 96px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, rgba(248, 187, 217, 0.8) 0%, rgba(129, 212, 250, 0.8) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon .icon {
  width: 48px;
  height: 48px;
  color: #999;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #666;
  margin: 0 0 8px;
}

.empty-text {
  color: #999;
  margin: 0;
}

.icon {
  width: 20px;
  height: 20px;
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .top-buttons {
    top: 10px;
    right: 16px;
    gap: 8px;
  }

  .search-input-container.expanded {
    width: 200px;
  }

  .sidebar-panel {
    top: 100px;
    right: 16px;
    width: calc(100vw - 32px);
    max-width: 320px;
    max-height: calc(100vh - 130px);
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 16px;
  }

  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .main-title {
    font-size: 2.5rem;
  }

  /* 移动端背景装饰调整 */
  .floating-circle {
    filter: blur(30px); /* 移动端稍微减少模糊 */
    opacity: 0.5; /* 移动端稍微降低透明度 */
  }

  .color-wave {
    opacity: 0.2; /* 移动端稍微降低波浪透明度 */
  }
}

@media (max-width: 480px) {
  .search-input-container.expanded {
    width: 150px;
  }

  .sidebar-panel {
    width: calc(100vw - 32px);
    max-width: 280px;
  }

  .sites-grid {
    grid-template-columns: 1fr;
  }

  /* 小屏幕背景装饰进一步调整 */
  .floating-circle {
    filter: blur(25px);
    opacity: 0.45;
  }

  .color-wave {
    opacity: 0.15;
  }
}
</style>
