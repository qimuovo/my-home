<template>
  <button 
    class="music-button"
    :class="{ playing: musicStore.playing }"
    @click="appStore.toggleMusicPlayer()"
    title="打开音乐播放器"
  >
    <div class="icon-wrapper">
      <span class="icon">🎵</span>
      <div class="waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useMusicStore } from '@/stores/music'

const appStore = useAppStore()
const musicStore = useMusicStore()
</script>

<style scoped lang="scss">
.music-button {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 60px;
  height: 60px;
  background: $glass-bg;
  backdrop-filter: $glass-blur;
  border: 2px solid $neon-sky;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s $ease-out-expo;
  z-index: 999;
  animation: float 3s ease-in-out infinite;
  box-shadow: 
    0 5px 20px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(79, 195, 247, 0.4);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(79, 195, 247, 0.6);
    
    .icon-wrapper {
      transform: rotate(10deg);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &.playing {
    border-color: $neon-peach;
    box-shadow: 
      0 5px 20px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 154, 139, 0.4);
    
    .waves {
      opacity: 1;
      
      .wave {
        animation: wave 1s ease-in-out infinite;
      }
    }
  }
  
  .icon-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    
    .icon {
      font-size: 1.8rem;
      position: relative;
      z-index: 2;
    }
    
    .waves {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 3px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
      
      .wave {
        width: 3px;
        height: 20px;
        background: $neon-sky;
        border-radius: 2px;
        animation: wave 1s ease-in-out infinite;
        
        &:nth-child(1) {
          animation-delay: 0s;
        }
        
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
}

@keyframes wave {
  0%, 100% {
    height: 10px;
  }
  50% {
    height: 20px;
  }
}

@media (max-width: 768px) {
  .music-button {
    bottom: 1.5rem;
    left: 1.5rem;
    width: 50px;
    height: 50px;
    
    .icon-wrapper .icon {
      font-size: 1.5rem;
    }
  }
}
</style>

