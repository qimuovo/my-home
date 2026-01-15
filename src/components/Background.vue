<template>
  <div class="background">
    <transition name="fade" mode="out-in">
      <img 
        :key="currentBg"
        :src="currentBg" 
        alt="background"
        class="bg-image"
        @load="onBgLoad"
      />
    </transition>
    <div class="overlay"></div>
    <div class="particles">
      <div 
        v-for="i in 20" 
        :key="i" 
        class="particle"
        :style="particleStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const bgImages = [
  '/images/background1.jpg',
  '/images/background2.jpg',
  '/images/background3.jpg',
  '/images/background4.jpg',
  '/images/background5.jpg',
  '/images/background6.jpg',
  '/images/background7.jpg',
  '/images/background8.jpg',
  '/images/background9.jpg',
  '/images/background10.jpg'
]

// 随机选择一张背景图
const randomIndex = Math.floor(Math.random() * bgImages.length)
appStore.setCurrentBgIndex(randomIndex + 1)

const currentBg = computed(() => bgImages[appStore.currentBgIndex - 1])

const onBgLoad = () => {
  appStore.setBgLoaded(true)
  setTimeout(() => {
    appStore.setLoading(false)
  }, 800)
}

const particleStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 3 + 2}s`
  }
}

// 自动切换背景（可选）
onMounted(() => {
  // setInterval(() => {
  //   const nextIndex = (appStore.currentBgIndex % bgImages.length) + 1
  //   appStore.setCurrentBgIndex(nextIndex)
  // }, 30000) // 每30秒切换
})
</script>

<style scoped lang="scss">
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  
  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg, 
      rgba(10, 10, 15, 0.3) 0%, 
      rgba(10, 10, 15, 0.7) 100%
    );
  }
  
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    
    .particle {
      position: absolute;
      background: $neon-sky;
      border-radius: 50%;
      opacity: 0;
      animation: particle-float 3s infinite ease-in-out;
      box-shadow: 0 0 10px $neon-sky;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes particle-float {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-20px) scale(1.2);
  }
}
</style>

