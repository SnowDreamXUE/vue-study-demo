<template>
  <div class="site-card" @click="handleClick">
    <!-- 网站图标 -->
    <div class="site-icon" :style="{ background: site.gradient }">
      <component :is="iconComponent" class="icon" />
    </div>

    <!-- 网站信息 -->
    <div class="site-info">
      <h3 class="site-name">{{ site.name }}</h3>
      <p class="site-description">{{ site.description }}</p>
      <span class="site-category">{{ site.category }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Code, Palette, Music, BookOpen, Camera, Gamepad2, Heart, Zap, Star } from 'lucide-vue-next'

// 图标映射
const iconMap = {
  Code,
  Palette,
  Music,
  BookOpen,
  Camera,
  Gamepad2,
  Heart,
  Zap,
  Star
}

// Props 定义
const props = defineProps({
  site: {
    type: Object,
    required: true,
    validator: (site) => {
      return site &&
          typeof site.id !== 'undefined' &&
          typeof site.name === 'string' &&
          typeof site.url === 'string' &&
          typeof site.description === 'string' &&
          typeof site.category === 'string' &&
          typeof site.icon === 'string' &&
          typeof site.gradient === 'string'
    }
  }
})

// Emits 定义
const emit = defineEmits(['click'])

// 计算属性
const iconComponent = computed(() => {
  return iconMap[props.site.icon] || Code
})

// 方法
const handleClick = () => {
  emit('click', props.site.url)
}
</script>

<style scoped>
.site-card {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.site-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.site-card:hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(248, 187, 217, 0.1) 0%, rgba(129, 212, 250, 0.1) 100%);
  border-radius: 16px;
}

.site-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.site-icon .icon {
  width: 32px;
  height: 32px;
  color: white;
}

.site-info {
  text-align: center;
  position: relative;
  z-index: 1;
}

.site-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px;
  transition: color 0.3s ease;
}

.site-card:hover .site-name {
  color: #e91e63;
}

.site-description {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.site-category {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(248, 187, 217, 0.8) 0%, rgba(129, 212, 250, 0.8) 100%);
  color: #e91e63;
  font-size: 12px;
  border-radius: 50px;
  font-weight: 500;
}
</style>
