<template>
  <transition name="fade">
    <div v-if="appStore.loading" class="loading-screen">
      <div class="loading-content">
        <div class="logo">
          <div class="cyber-circle">
            <div class="inner-circle"></div>
          </div>
        </div>
        <div class="loading-text">
          <span class="text">INITIALIZING</span>
          <span class="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
        <div class="loading-bar">
          <div class="progress"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  .loading-content {
    text-align: center;
    
    .logo {
      margin-bottom: 2rem;
      
      .cyber-circle {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        position: relative;
        border: 3px solid $neon-sky;
        border-radius: 50%;
        animation: rotate 2s linear infinite;
        box-shadow: 
          0 0 20px $neon-sky,
          inset 0 0 20px $neon-sky;
        
        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
        
        &::before {
          width: 80%;
          height: 80%;
          border: 2px solid $neon-cyan;
          animation: rotate 1.5s linear infinite reverse;
          box-shadow: 
            0 0 15px $neon-cyan,
            inset 0 0 15px $neon-cyan;
        }
        
        .inner-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: linear-gradient(135deg, $neon-sky, $neon-peach);
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 30px rgba(79, 195, 247, 0.6);
        }
      }
    }
    
    .loading-text {
      font-family: 'Orbitron', monospace;
      font-size: 1.5rem;
      color: $neon-sky;
      letter-spacing: 0.3em;
      margin-bottom: 1.5rem;
      text-shadow: 0 0 10px $neon-sky;
      
      .dots {
        span {
          animation: dot-pulse 1.5s ease-in-out infinite;
          
          &:nth-child(1) {
            animation-delay: 0s;
          }
          &:nth-child(2) {
            animation-delay: 0.3s;
          }
          &:nth-child(3) {
            animation-delay: 0.6s;
          }
        }
      }
    }
    
    .loading-bar {
      width: 300px;
      height: 4px;
      background: rgba(79, 195, 247, 0.2);
      border-radius: 2px;
      overflow: hidden;
      margin: 0 auto;
      
      .progress {
        height: 100%;
        background: linear-gradient(90deg, $neon-sky, $neon-peach);
        animation: progress 2s ease-in-out infinite;
        box-shadow: 0 0 10px $neon-sky;
      }
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

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes dot-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}
</style>

