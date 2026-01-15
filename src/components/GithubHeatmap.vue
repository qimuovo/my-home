<template>
  <div class="github-heatmap glass">
    <h3 class="title">GitHub 活跃度</h3>
    <div class="heatmap-container">
      <!-- 使用第三方服务显示贡献图 -->
      <div class="contribution-chart">
        <img 
          :src="`https://ghchart.rshah.org/${props.username}`" 
          :alt="`${props.username}'s GitHub chart`"
          class="chart-image"
          @error="onImageError"
          @load="onImageLoad"
        />
        <div v-if="loading" class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        <div v-if="error" class="error-placeholder">
          <p>⚠️ 加载失败</p>
          <p class="hint">请检查用户名是否正确</p>
        </div>
      </div>
    </div>
    <div class="github-info">
      <a :href="`https://github.com/${props.username}`" target="_blank" rel="noopener noreferrer" class="github-link">
        <img src="/images/icon/github.png" alt="GitHub" class="github-icon" />
        <span>@{{ props.username }}</span>
      </a>
      <a :href="`https://github.com/${props.username}?tab=repositories`" target="_blank" class="repo-link">
        查看仓库 →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  username: {
    type: String,
    default: 'qimuovo'
  }
})

const loading = ref(true)
const error = ref(false)

const onImageLoad = () => {
  loading.value = false
  error.value = false
}

const onImageError = () => {
  loading.value = false
  error.value = true
}
</script>

<style scoped lang="scss">
.github-heatmap {
  padding: 1.5rem;
  animation: slideInUp 0.8s $ease-out-expo 0.3s both;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
    color: $neon-sky;
    text-shadow: 0 0 10px $neon-sky;
    text-align: center;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
  }
  
  .heatmap-container {
    flex: 1;
    position: relative;
    min-height: 180px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: $radius-md;
    overflow: hidden;
    padding: 1rem;
    
    .contribution-chart {
      width: 100%;
      height: 100%;
      position: relative;
      
      .chart-image {
        width: 100%;
        height: auto;
        display: block;
        border-radius: $radius-sm;
      }
      
      .loading-placeholder,
      .error-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $text-secondary;
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(79, 195, 247, 0.2);
          border-top-color: $neon-sky;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        p {
          font-size: 0.9rem;
          margin: 0.3rem 0;
        }
        
        .hint {
          font-size: 0.8rem;
          opacity: 0.7;
        }
      }
    }
  }
  
  .github-info {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    
    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(79, 195, 247, 0.08);
      border: 1px solid rgba(79, 195, 247, 0.3);
      border-radius: $radius-md;
      text-decoration: none;
      color: $text-primary;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(79, 195, 247, 0.18);
        border-color: $neon-sky;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(79, 195, 247, 0.3);
      }
      
      .github-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
      }
    }
    
    .repo-link {
      padding: 0.5rem 1rem;
      background: rgba(255, 154, 139, 0.08);
      border: 1px solid rgba(255, 154, 139, 0.3);
      border-radius: $radius-md;
      text-decoration: none;
      color: $neon-peach;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      white-space: nowrap;
      
      &:hover {
        background: rgba(255, 154, 139, 0.18);
        border-color: $neon-peach;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 154, 139, 0.3);
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .github-heatmap {
    padding: 1.2rem;
    
    .title {
      font-size: 1rem;
    }
    
    .heatmap-container {
      min-height: 180px;
    }
  }
}
</style>

