<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import Background from '@/components/Background.vue'
import Loading from '@/components/Loading.vue'
import Clock from '@/components/Clock.vue'
import Hitokoto from '@/components/Hitokoto.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import GithubHeatmap from '@/components/GithubHeatmap.vue'
import SiteLinks from '@/components/SiteLinks.vue'
import Footer from '@/components/Footer.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import MusicButton from '@/components/MusicButton.vue'

const appStore = useAppStore()

// 监听屏幕尺寸变化
const handleResize = () => {
  appStore.updateScreenWidth()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  
  // 控制台信息
  const styles = [
    'color: #00f0ff',
    'font-size: 20px',
    'font-weight: bold',
    'text-shadow: 0 0 10px #00f0ff'
  ].join(';')
  
  console.log('%c欢迎来到我的主页！', styles)
  console.log('%cWelcome to my homepage!', 'color: #ff00ff; font-size: 16px;')
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div id="app">
    <!-- 背景 -->
    <Background />
    
    <!-- 加载动画 -->
    <Loading />
    
    <!-- 主要内容 -->
    <transition name="fade">
      <main v-if="!appStore.loading" class="main-container">
        <div class="container">
          <!-- 顶部区域：时钟 -->
          <section class="top-section">
            <Clock />
          </section>
          
          <!-- 中间区域：个人信息、一言和GitHub热力图 -->
          <section class="middle-section">
            <div class="left-panel">
              <ProfileCard />
            </div>
            <div class="right-panel">
              <div class="right-top">
                <Hitokoto />
              </div>
              <div class="right-bottom">
                <GithubHeatmap username="qimuovo" />
              </div>
            </div>
          </section>
          
          <!-- 网站链接 -->
          <section class="sites-section">
            <SiteLinks />
          </section>
        </div>
        
        <!-- 页脚 -->
        <Footer />
      </main>
    </transition>
    
    <!-- 音乐按钮 -->
    <MusicButton v-if="!appStore.loading" />
    
    <!-- 音乐播放器 -->
    <MusicPlayer />
  </div>
</template>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: relative;
}

.main-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
  .container {
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    padding-bottom: 1rem;
    width: 100%;
    
    .top-section {
      margin-bottom: 2rem;
    }
    
    .middle-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
      
      .left-panel {
        min-height: 300px;
      }
      
      .right-panel {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        .right-top {
          flex: 0 0 auto;
        }
        
        .right-bottom {
          flex: 1;
          min-height: 250px;
        }
      }
    }
    
    .sites-section {
      margin-bottom: 2rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式布局
@media (max-width: 1200px) {
  .main-container .container {
    padding: 1.5rem;
    padding-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .main-container .container {
    padding: 1rem;
    padding-bottom: 0.5rem;
    
    .middle-section {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      
      .right-panel {
        gap: 1rem;
        
        .right-bottom {
          min-height: 200px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .main-container .container {
    padding: 0.5rem;
    padding-bottom: 0.5rem;
    
    .top-section,
    .middle-section,
    .sites-section {
      margin-bottom: 1rem;
    }
  }
}
</style>
