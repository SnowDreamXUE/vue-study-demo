<template>
  <div class="page-wrapper">
    <!-- 页面背景图片 -->
    <div class="page-background"></div>

    <!-- 周围虚化边框 -->
    <div class="blur-border blur-top"></div>
    <div class="blur-border blur-bottom"></div>
    <div class="blur-border blur-left"></div>
    <div class="blur-border blur-right"></div>

    <!-- 主体窗口 -->
    <div class="main-container">
      <!-- 左侧透明区域（显示背景图片） -->
      <div class="transparent-section">
        <!-- 装饰元素 -->
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
      </div>

      <!-- 右侧表单区域（毛玻璃） -->
      <div class="form-section">
        <div class="form-container">
          <!-- 表单头部 -->
          <div class="form-header">
            <h2 class="form-title">
              {{ isLogin ? '欢迎回来' : '创建账户' }}
            </h2>
            <p class="form-subtitle">
              {{ isLogin ? '登录您的账户继续使用' : '注册新账户开始您的旅程' }}
            </p>
          </div>

          <!-- 切换按钮 -->
          <div class="tab-container">
            <button
                @click="isLogin = true"
                :class="['tab-button', { active: isLogin }]"
            >
              登录
            </button>
            <button
                @click="isLogin = false"
                :class="['tab-button', { active: !isLogin }]"
            >
              注册
            </button>
          </div>

          <!-- 表单内容区域 -->
          <div class="form-content-wrapper">
            <transition name="form-slide" mode="out-in">
              <!-- 登录表单 -->
              <form v-if="isLogin" key="login" @submit.prevent="handleLogin" class="auth-form">
                <div class="input-wrapper">
                  <input
                      v-model="loginForm.email"
                      type="email"
                      required
                      class="glass-input"
                      placeholder="邮箱地址"
                  />
                </div>

                <div class="input-wrapper">
                  <input
                      v-model="loginForm.password"
                      type="password"
                      required
                      class="glass-input"
                      placeholder="密码"
                  />
                </div>

                <div class="form-row">
                  <label class="remember-label">
                    <input type="checkbox" class="custom-checkbox">
                    <span class="checkmark"></span>
                    记住我
                  </label>
                  <a href="#" class="forgot-password">忘记密码？</a>
                </div>

                <button type="submit" class="primary-button">
                  <span>登录</span>
                </button>
              </form>

              <!-- 注册表单 -->
              <form v-else key="register" @submit.prevent="handleRegister" class="auth-form">
                <div class="input-wrapper">
                  <input
                      v-model="registerForm.username"
                      type="text"
                      required
                      class="glass-input"
                      placeholder="用户名"
                  />
                </div>

                <div class="input-wrapper">
                  <input
                      v-model="registerForm.email"
                      type="email"
                      required
                      class="glass-input"
                      placeholder="邮箱地址"
                  />
                </div>

                <div class="input-wrapper">
                  <input
                      v-model="registerForm.password"
                      type="password"
                      required
                      class="glass-input"
                      placeholder="密码"
                  />
                </div>

                <div class="input-wrapper">
                  <input
                      v-model="registerForm.confirmPassword"
                      type="password"
                      required
                      class="glass-input"
                      placeholder="确认密码"
                  />
                </div>

                <div class="terms-wrapper">
                  <label class="remember-label">
                    <input type="checkbox" required class="custom-checkbox">
                    <span class="checkmark"></span>
                    <span class="terms-text">
                      我同意 <a href="#" class="terms-link">服务条款</a> 和 <a href="#" class="terms-link">隐私政策</a>
                    </span>
                  </label>
                </div>

                <button type="submit" class="primary-button">
                  <span>注册</span>
                </button>
              </form>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLogin = ref(true)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = () => {
  console.log('登录:', loginForm.value)
}

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('密码不匹配')
    return
  }
  console.log('注册:', registerForm.value)
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* 页面包装器 */
.page-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 页面背景图片 */
.page-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../static/background.jpg?height=1080&width=1920');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 周围虚化边框 */
.blur-border {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 2;
}

.blur-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
}

.blur-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
}

.blur-left {
  top: 20px;
  left: 0;
  width: 20px;
  height: calc(100% - 40px);
}

.blur-right {
  top: 20px;
  right: 0;
  width: 20px;
  height: calc(100% - 40px);
}

/* 主体容器 */
.main-container {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  overflow: hidden;
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 左侧透明区域 */
.transparent-section {
  flex: 1;
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 浮动装饰元素 */
.floating-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: floatAnimation 8s ease-in-out infinite;
}

.element-1 {
  width: 120px;
  height: 120px;
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.element-2 {
  width: 80px;
  height: 80px;
  top: 65%;
  right: 20%;
  animation-delay: 3s;
}

.element-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 25%;
  animation-delay: 6s;
}

@keyframes floatAnimation {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-30px) scale(1.1);
    opacity: 0.9;
  }
}

/* 右侧表单区域 */
.form-section {
  width: 450px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
}

.form-container {
  width: 100%;
  padding: 3rem 2.5rem;
}

/* 表单头部 */
.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #718096;
  font-size: 1rem;
  line-height: 1.5;
}

/* 切换标签 */
.tab-container {
  display: flex;
  margin-bottom: 2rem;
  padding: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50px;
}

.tab-button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  color: #718096;
  position: relative;
  overflow: hidden;
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  border-radius: 50px;
}

.tab-button.active::before {
  left: 0;
}

.tab-button.active {
  color: white;
  transform: translateY(-1px);
}

/* 表单内容包装器 */
.form-content-wrapper {
  position: relative;
}

/* 表单 */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input-wrapper {
  position: relative;
}

.glass-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #2d3748;
}

.glass-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px) scale(1.02);
}

.glass-input::placeholder {
  color: #a0aec0;
}

/* 表单行 */
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.remember-label {
  display: flex;
  align-items: center;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.9rem;
}

.custom-checkbox {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox:checked + .checkmark {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
}

.custom-checkbox:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 2px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.forgot-password, .terms-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-password:hover, .terms-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* 条款包装器 */
.terms-wrapper {
  margin-bottom: 0.5rem;
}

.terms-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #4a5568;
}

/* 主要按钮 */
.primary-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea, #764ba2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.primary-button:active {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-container {
    flex-direction: column;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .blur-top, .blur-bottom {
    height: 10px;
  }

  .blur-left, .blur-right {
    width: 10px;
    top: 10px;
    height: calc(100% - 20px);
  }

  .transparent-section {
    height: 40%;
  }

  .form-section {
    width: 100%;
    height: 60%;
  }

  .form-container {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem 1rem;
  }

  .form-title {
    font-size: 1.8rem;
  }
}

/* 表单切换动画 */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.form-slide-enter-to,
.form-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
