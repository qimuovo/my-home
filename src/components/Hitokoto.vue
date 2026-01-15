<template>
  <div class="hitokoto glass" @click="fetchHitokoto">
    <div class="hitokoto-content">
      <transition name="slide-fade" mode="out-in">
        <div :key="hitokoto.text" class="content-wrapper">
          <div class="quote-icon">"</div>
          <p class="text">{{ hitokoto.text }}</p>
          <p class="from">—— {{ hitokoto.from }}</p>
        </div>
      </transition>
    </div>
    <div class="refresh-hint">
      <i class="refresh-icon">↻</i>
      <span>点击刷新</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHitokoto } from '@/api'
import { ElMessage } from 'element-plus'

const hitokoto = reactive({
  text: '加载中...',
  from: '一言'
})

const loading = ref(false)

const fetchHitokoto = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    const data: any = await getHitokoto()
    hitokoto.text = data.hitokoto
    hitokoto.from = data.from || '未知'
  } catch (error) {
    ElMessage.error('获取一言失败')
    hitokoto.text = '世界上最遥远的距离，不是生与死，而是你在我面前，我却不能说我爱你。'
    hitokoto.from = '泰戈尔'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped lang="scss">
.hitokoto {
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s $ease-out-expo;
  animation: slideInUp 0.8s $ease-out-expo 0.2s both;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(79, 195, 247, 0.3);
    
    .refresh-hint {
      opacity: 1;
    }
  }
  
  .hitokoto-content {
    .content-wrapper {
      position: relative;
      
      .quote-icon {
        position: absolute;
        top: -20px;
        left: -10px;
        font-size: 4rem;
        color: $neon-sky;
        opacity: 0.3;
        font-family: Georgia, serif;
      }
      
      .text {
        font-size: 1.3rem;
        line-height: 1.8;
        color: $text-primary;
        margin-bottom: 1rem;
        min-height: 3.6em;
        position: relative;
        z-index: 1;
      }
      
      .from {
        text-align: right;
        color: $text-secondary;
        font-style: italic;
        font-size: 1rem;
      }
    }
  }
  
  .refresh-hint {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: $neon-sky;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    .refresh-icon {
      font-size: 1.2rem;
      animation: rotate-hint 2s linear infinite;
      animation-play-state: paused;
    }
  }
  
  &:hover .refresh-icon {
    animation-play-state: running;
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes rotate-hint {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .hitokoto {
    padding: 1.5rem;
    
    .hitokoto-content {
      .content-wrapper {
        .text {
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>

