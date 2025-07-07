<template>
  <transition name="loading-fade">
    <div v-if="visible" class="page-loading-overlay">
      <!-- 背景装饰 -->
      <div class="bg-decoration">
        <div class="floating-star" v-for="n in 12" :key="'star-' + n" :style="getStarStyle(n)">
          ✦
        </div>
        <div class="floating-heart" v-for="n in 6" :key="'heart-' + n" :style="getHeartStyle(n)">
          ♡
        </div>
      </div>

      <div class="loading-content">
        <!-- 圆圈动画 -->
        <div class="circle-animation">
          <div class="rotating-circle outer-ring"></div>
          <div class="rotating-circle middle-ring"></div>
          <div class="rotating-circle inner-ring"></div>
        </div>

        <!-- Loading文字 -->
        <div class="loading-text">
          <div class="text-container">
            <span class="text-letter" v-for="(letter, index) in 'Loading'" :key="'letter-' + index" :style="{ animationDelay: index * 0.1 + 's' }">
              {{ letter }}
            </span>
          </div>
          <div class="loading-dots">
            <span class="dot" v-for="n in 3" :key="'dot-' + n" :style="{ animationDelay: n * 0.2 + 's' }">
              ●
            </span>
          </div>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }">
          <div class="progress-sparkle"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PageLoading',
  data() {
    return {
      visible: false,
      progress: 0,
      progressTimer: null
    }
  },
  methods: {
    show() {
      this.visible = true
      this.progress = 0
      this.startProgress()
    },

    hide() {
      this.progress = 100
      setTimeout(() => {
        this.visible = false
        this.stopProgress()
      }, 300)
    },

    startProgress() {
      this.stopProgress()
      this.progress = 0

      this.progressTimer = setInterval(() => {
        if (this.progress < 90) {
          this.progress += Math.random() * 8
        }
      }, 120)
    },

    stopProgress() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }
    },

    getStarStyle(index) {
      const positions = [
        { top: '10%', left: '15%' }, { top: '20%', right: '10%' },
        { top: '30%', left: '8%' }, { top: '15%', right: '20%' },
        { bottom: '25%', left: '12%' }, { bottom: '15%', right: '15%' },
        { top: '45%', left: '5%' }, { top: '55%', right: '8%' },
        { bottom: '35%', left: '20%' }, { bottom: '45%', right: '25%' },
        { top: '65%', left: '10%' }, { top: '75%', right: '12%' }
      ]

      return {
        ...positions[index - 1],
        animationDelay: (index * 0.3) + 's',
        fontSize: (12 + Math.random() * 8) + 'px'
      }
    },

    getHeartStyle(index) {
      const positions = [
        { top: '25%', left: '25%' }, { top: '35%', right: '30%' },
        { bottom: '30%', left: '30%' }, { bottom: '40%', right: '35%' },
        { top: '60%', left: '25%' }, { top: '70%', right: '30%' }
      ]

      return {
        ...positions[index - 1],
        animationDelay: (index * 0.5) + 's'
      }
    }
  },

  beforeDestroy() {
    this.stopProgress()
  }
}
</script>

<style scoped>
.page-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ff9a9e 0%, #a855f7 25%, #8b5cf6 50%, #3b82f6 75%, #06b6d4 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-star {
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  animation: twinkle 2s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.floating-heart {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

.loading-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.text-container {
  display: flex;
  gap: 0.1rem;
}

.text-letter {
  display: inline-block;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(168, 85, 247, 0.8), 0 0 45px rgba(59, 130, 246, 0.6);
  animation: letterBounce 1.5s ease-in-out infinite;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.loading-dots {
  display: flex;
  gap: 0.3rem;
}

.loading-dots .dot {
  color: white;
  font-size: 1.2rem;
  animation: dotPulse 1.2s ease-in-out infinite;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

@keyframes letterBounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.1); }
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

.circle-animation {
  position: relative;
  width: 120px;
  height: 120px;
}

.rotating-circle {
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-style: solid;
}

.outer-ring {
  width: 120px;
  height: 120px;
  border-width: 4px;
  border-color: rgba(255, 255, 255, 0.3) transparent rgba(255, 255, 255, 0.3) transparent;
  animation: rotateClockwise 2s linear infinite;
}

.middle-ring {
  width: 80px;
  height: 80px;
  border-width: 3px;
  border-color: transparent rgba(255, 255, 255, 0.6) transparent rgba(255, 255, 255, 0.6);
  animation: rotateCounterClockwise 1.5s linear infinite;
}

.inner-ring {
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.8) transparent rgba(255, 255, 255, 0.8) transparent;
  animation: rotateClockwise 1s linear infinite;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9a9e, #a855f7, #8b5cf6, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  position: relative;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
}

@keyframes rotateClockwise {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotateCounterClockwise {
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: all 0.5s ease;
}

.loading-fade-enter {
  opacity: 0;
  transform: scale(0.9);
}

.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .text-letter {
    font-size: 2rem;
  }

  .circle-animation {
    width: 100px;
    height: 100px;
  }

  .outer-ring {
    width: 100px;
    height: 100px;
  }
}
</style>
