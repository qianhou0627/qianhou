<script setup lang="ts">
// 导入必要的组件或库（如果需要的话）
import { StagewiseToolbar } from '@stagewise/toolbar-vue'
import { ref, onMounted } from 'vue'
import HomePage from './views/HomePage.vue'

// stagewise配置
const stagewiseConfig = {
  plugins: [],
}

// 判断是否为开发环境
const isDev = import.meta.env.DEV

// 当前选中的菜单项
const activeMenu = ref('首页')

// 下载状态
const isDownloading = ref(false)
const showProgressBubble = ref(false)
const countdownSeconds = ref(20)
const progressPercent = ref(0)
const downloadUrl = 'https://dl.todesk.com/windows/ToDesk_Lite.exe'
const countdownTimer = ref<number | null>(null)

// 抽屉菜单状态
const isDrawerOpen = ref(false)

// 切换菜单项
const switchMenu = (menu: string): void => {
  activeMenu.value = menu
  // 在移动端选择菜单项后关闭抽屉
  isDrawerOpen.value = false
}

// 切换抽屉菜单
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// 处理下载按钮点击
const handleDownload = () => {
  // 每次点击都重置状态并显示弹窗
  isDownloading.value = true
  showProgressBubble.value = true
  countdownSeconds.value = 20
  progressPercent.value = 0

  // 直接触发下载
  window.open(downloadUrl, '_blank')

  // 清除可能存在的旧定时器
  if (countdownTimer.value !== null) {
    clearInterval(countdownTimer.value)
  }

  // 开始倒计时
  countdownTimer.value = window.setInterval(() => {
    countdownSeconds.value -= 1
    progressPercent.value = (20 - countdownSeconds.value) * 5 // 0-100%

    if (countdownSeconds.value <= 0) {
      if (countdownTimer.value !== null) {
        clearInterval(countdownTimer.value)
        countdownTimer.value = null
      }
      isDownloading.value = false
      // 不关闭进度气泡，保持显示
    }
  }, 1000)
}

// 关闭进度气泡
const closeProgressBubble = () => {
  showProgressBubble.value = false
}

// 处理搜索框输入 - 现在由HomePage组件自己处理
onMounted(() => {
  // 搜索功能已移至HomePage组件中实现
})
</script>

<template>
  <div class="app">
    <header class="navbar">
      <div class="navbar-content">
        <div class="navbar-left">
          <div class="logo-container">
            <img src="./assets/logo.svg" alt="Logo" class="logo" />
          </div>
          <div class="logo">前后网络科技工作室</div>

          <!-- 汉堡菜单按钮 -->
          <button class="drawer-toggle" @click="toggleDrawer">
            <svg
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M892.928 128q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 448.512q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 769.024q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0z"
              />
            </svg>
          </button>

          <!-- 导航菜单 -->
          <nav class="menu">
            <a
              href="#"
              class="menu-item"
              :class="{ 'menu-item-active': activeMenu === '首页' }"
              @click.prevent="switchMenu('首页')"
              >首页</a
            >
            <a
              href="#"
              class="menu-item"
              :class="{ 'menu-item-active': activeMenu === '小红书店铺' }"
              @click.prevent="switchMenu('小红书店铺')"
              >小红书店铺</a
            >
            <a
              href="#"
              class="menu-item"
              :class="{ 'menu-item-active': activeMenu === '没想好' }"
              @click.prevent="switchMenu('没想好')"
              >没想好</a
            >
            <a
              href="#"
              class="menu-item"
              :class="{ 'menu-item-active': activeMenu === '未定' }"
              @click.prevent="switchMenu('未定')"
              >未定</a
            >
          </nav>
        </div>

        <div class="navbar-right">
          <div class="actions">
            <input type="text" class="nav-input" id="input" placeholder="请搜索软件名称..." />
            <div class="download-container">
              <button class="download-btn" @click="handleDownload">
                <span>下载运程软件</span>
                <svg
                  class="download-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <div class="progress-bubble" v-if="showProgressBubble">
                <div class="progress-header">
                  <div class="progress-text">阅读倒计时：{{ countdownSeconds }}秒</div>
                  <button class="close-btn" @click="closeProgressBubble">&times;</button>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
                </div>
                <div class="progress-info">
                  <p>开始下载.....</p>
                  <p>完成后，找到文件打开即可</p>
                  <p>
                    若遇到报毒阻拦，鼠标放置阻拦文本上，在文本（最右边）会隐约有三个点，进入后，按照提示保留即可
                  </p>
                  <p>&nbsp;</p>
                  <p>打开软件后，点击复制代码</p>
                  <p>发送给右下角的聊天窗口，等待远程</p>
                  <div class="read-complete-container">
                    <button class="read-complete-btn" @click="closeProgressBubble">
                      我已阅读完毕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 抽屉式菜单 -->
    <div class="drawer-menu" :class="{ 'drawer-open': isDrawerOpen }">
      <div class="drawer-overlay" @click="toggleDrawer"></div>
      <div class="drawer-content">
        <div class="drawer-header">
          <h3>菜单</h3>
          <button class="drawer-close" @click="toggleDrawer">&times;</button>
        </div>
        <div class="drawer-body">
          <a
            href="#"
            class="drawer-item"
            :class="{ 'drawer-item-active': activeMenu === '首页' }"
            @click.prevent="switchMenu('首页')"
            >首页</a
          >
          <a
            href="#"
            class="drawer-item"
            :class="{ 'drawer-item-active': activeMenu === '小红书店铺' }"
            @click.prevent="switchMenu('小红书店铺')"
            >小红书店铺</a
          >
          <a
            href="#"
            class="drawer-item"
            :class="{ 'drawer-item-active': activeMenu === '没想好' }"
            @click.prevent="switchMenu('没想好')"
            >没想好</a
          >
          <a
            href="#"
            class="drawer-item"
            :class="{ 'drawer-item-active': activeMenu === '未定' }"
            @click.prevent="switchMenu('未定')"
            >未定</a
          >
        </div>
      </div>
    </div>

    <!-- 页面内容区域 -->
    <main class="main-content">
      <!-- 这里放置页面主要内容 -->
      <HomePage v-if="activeMenu === '首页'" class="page-content" />
      <div v-else-if="activeMenu === '小红书店铺'" class="page-content">
        小红书店铺：前后网络科技工作室
      </div>
      <div v-else-if="activeMenu === '没想好'" class="page-content">没想好内容</div>
      <div v-else-if="activeMenu === '未定'" class="page-content">未定内容</div>
    </main>

    <!-- stagewise工具栏，仅在开发环境中显示 -->
    <StagewiseToolbar v-if="isDev" :config="stagewiseConfig" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '荆南波波黑', sans-serif !important;
}

.app {
  width: 100%;
  min-height: 100vh;
}

.app-name {
  margin-left: 8px;
  font-weight: bold;
  font-size: 20px; /* 根据需要调整字体大小 */
}

/* 导航栏样式 */
.navbar {
  height: 70px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-content {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

/* 左侧部分 */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 20px;
}

/* 右侧部分 */
.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo-container {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* 抽屉菜单按钮 */
.drawer-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 5px;
}

.menu {
  display: flex;
  gap: 30px;
}

.menu-item {
  border-radius: 10px;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  transition: all 0.3s;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #d1d1d1;
  color: #000000;
}

.menu-item-active {
  background-color: #000000;
  color: #ffffff;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
  transition: all 0.3s;
}

.nav-input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.download-container {
  position: relative;
}

.download-btn {
  background-color: #0071f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.download-btn:hover {
  background-color: #0071f3;
  transform: scale(1.05);
}

.download-icon {
  margin-left: 4px;
}

/* 为了防止内容被导航栏遮挡 */
.main-content {
  width: 100%;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  padding: 0;
}

/* 页面内容样式 */
.page-content {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 20px;
}

.progress-bubble {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 1000;
}

.progress-bubble:after {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.progress-text {
  font-size: 12px;
  margin-bottom: 5px;
  text-align: center;
  color: #333;
}

.progress-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #0071f3;
  width: 0%;
  transition: width 0.3s;
}

.progress-info {
  margin-top: 10px;
  text-align: left;
  color: #333;
  font-size: 12px;
  line-height: 1.5;
}

.progress-info p {
  margin: 5px 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  padding: 0 5px;
}

.close-btn:hover {
  color: #333;
}

.read-complete-container {
  margin-top: 15px;
  text-align: center;
}

.read-complete-btn {
  background-color: #00ad54;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.read-complete-btn:hover {
  background-color: #008f45;
  transform: scale(1.05);
}

/* 抽屉菜单样式 */
.drawer-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0.3s;
}

.drawer-open {
  visibility: visible;
  pointer-events: auto;
}

.drawer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.drawer-open .drawer-overlay {
  opacity: 1;
}

.drawer-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  overflow-y: auto;
}

.drawer-open .drawer-content {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
}

.drawer-header h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.drawer-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0 5px;
}

.drawer-close:hover {
  color: #333;
}

.drawer-body {
  padding: 20px;
}

.drawer-item {
  display: block;
  padding: 12px 0;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  border-bottom: 1px solid #eaeaea;
  transition: all 0.3s;
}

.drawer-item:last-child {
  border-bottom: none;
}

.drawer-item:hover {
  color: #1890ff;
}

.drawer-item-active {
  color: #1890ff;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .navbar-left {
    gap: 15px;
  }

  .menu {
    gap: 15px;
  }

  .nav-input {
    width: 200px;
  }

  .drawer-toggle {
    display: block;
    order: 3;
  }

  .menu {
    display: none;
  }

  .logo {
    font-size: 16px;
  }

  .download-btn span {
    display: none;
  }

  .download-btn {
    padding: 10px;
  }

  .download-icon {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .navbar-left {
    margin-left: 10px;
    gap: 10px;
  }

  .navbar-right {
    margin-right: 10px;
  }

  .nav-input {
    width: 150px;
  }
}

@media (max-width: 576px) {
  .navbar-left {
    margin-left: 5px;
    gap: 10px;
  }

  .navbar-right {
    margin-right: 5px;
  }

  .logo-container {
    width: 40px;
    height: 40px;
  }

  .logo {
    font-size: 14px;
  }

  .actions {
    gap: 10px;
  }

  .nav-input {
    width: 120px;
  }
}
</style>
