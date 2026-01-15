<template>
  <div class="site-links">
    <h2 class="title">我的站点</h2>
    <div class="links-grid">
      <a
        v-for="(site, index) in siteLinks"
        :key="site.name"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="site-card"
        :style="{
          animationDelay: `${index * 0.1}s`,
          '--accent-color': site.color
        }"
      >
        <div class="card-bg"></div>
        <div class="card-content">
          <img :src="site.icon" :alt="site.name" class="icon" />
          <h3 class="name">{{ site.name }}</h3>
          <p class="desc">{{ site.desc }}</p>
        </div>
        <div class="card-arrow">→</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import siteLinksData from '@/config/site-links.json'

const siteLinks = reactive(siteLinksData)
</script>

<style scoped lang="scss">
.site-links {
  padding: 2rem;
  animation: fadeIn 0.8s ease 0.8s both;
  
  .title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: bold;
    color: $neon-sky;
    text-shadow: 0 0 10px $neon-sky;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: 0.1em;
    
    &::before,
    &::after {
      content: '//';
      margin: 0 1rem;
      color: $neon-peach;
    }
  }
  
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    
    .site-card {
      position: relative;
      padding: 1.2rem 1rem;
      background: $glass-bg;
      backdrop-filter: $glass-blur;
      border: 1px solid $glass-border;
      border-radius: $radius-md;
      text-decoration: none;
      color: $text-primary;
      overflow: hidden;
      transition: all 0.4s $ease-out-expo;
      animation: slideInUp 0.6s $ease-out-expo both;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, 
          transparent 0%, 
          var(--accent-color, $neon-sky) 100%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      
      .card-bg {
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle,
          var(--accent-color, $neon-sky) 0%,
          transparent 70%
        );
        opacity: 0;
        transition: all 0.6s ease;
      }
      
      &:hover {
        transform: translateY(-10px);
        border-color: var(--accent-color, $neon-sky);
        box-shadow: 
          0 10px 30px rgba(0, 0, 0, 0.3),
          0 0 20px var(--accent-color, rgba(79, 195, 247, 0.4));
        
        &::before {
          opacity: 0.1;
        }
        
        .card-bg {
          opacity: 0.15;
          top: -25%;
          right: -25%;
        }
        
        .icon {
          transform: scale(1.2) rotate(10deg);
        }
        
        .card-arrow {
          opacity: 1;
          right: 1.5rem;
        }
      }
      
      .card-content {
        position: relative;
        z-index: 1;
        text-align: center;
        
        .icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 0.8rem;
          display: block;
          object-fit: contain;
          transition: transform 0.4s $ease-out-expo;
          filter: drop-shadow(0 0 8px var(--accent-color, $neon-sky));
        }
        
        .name {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 0.3rem;
          color: $text-primary;
        }
        
        .desc {
          font-size: 0.85rem;
          color: $text-secondary;
          line-height: 1.4;
        }
      }
      
      .card-arrow {
        position: absolute;
        top: 1rem;
        right: 0.8rem;
        font-size: 1.2rem;
        color: var(--accent-color, $neon-sky);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2;
      }
    }
  }
}

@media (max-width: 768px) {
  .site-links {
    padding: 1.5rem 1rem;
    
    .title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .links-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      
      .site-card {
        padding: 1rem 0.8rem;
        
        .card-content {
          .icon {
            width: 40px;
            height: 40px;
            margin-bottom: 0.6rem;
          }
          
          .name {
            font-size: 1rem;
          }
          
          .desc {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}
</style>

