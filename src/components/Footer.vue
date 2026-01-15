<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="copyright">
        &copy;
        <span v-if="startYear && startYear < currentYear" class="year-range">
          {{ startYear }} - 
        </span>
        {{ currentYear }}
        <a :href="siteUrl" target="_blank" rel="noopener noreferrer">{{ siteName }}</a>
      </span>
      <span v-if="siteIcp" class="icp">
        &amp;
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
          {{ siteIcp }}
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

// 从环境变量或使用默认值
const startYear = computed(() => {
  const start = import.meta.env.VITE_SITE_START
  return start && start.length >= 4 ? parseInt(start.substring(0, 4)) : null
})

const siteName = computed(() => import.meta.env.VITE_SITE_TITLE || '个人主页')
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL
  if (!url) return '#'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return '//' + url
  }
  return url
})
const siteIcp = computed(() => import.meta.env.VITE_SITE_ICP || '')
</script>

<style scoped lang="scss">
@use 'sass:color';
.footer {
  width: 100%;
  height: 46px;
  line-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 240, 255, 0.1);
  font-size: 14px;
  color: $text-secondary;
  position: relative;
  z-index: 10;
  
  .footer-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
    
    .copyright {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      
      .year-range {
        display: inline;
      }
      
      a {
        color: $neon-blue;
        text-decoration: none;
        margin-left: 0.3rem;
        transition: all 0.3s ease;
        
        &:hover {
          color: color.adjust($neon-blue, $lightness: 10%);
          text-shadow: 0 0 10px $neon-blue;
        }
      }
    }
    
    .icp {
      a {
        color: $text-secondary;
        text-decoration: none;
        margin-left: 0.3rem;
        transition: all 0.3s ease;
        
        &:hover {
          color: $text-primary;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    
    .footer-content {
      flex-direction: column;
      gap: 0.2rem;
      line-height: 1.4;
      padding: 0.5rem;
    }
  }
}

@media (max-width: 480px) {
  .footer {
    .footer-content {
      .copyright {
        .year-range {
          display: none;
        }
      }
    }
  }
}
</style>

