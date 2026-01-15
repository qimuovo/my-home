<template>
  <div class="profile-card glass">
    <div class="avatar-wrapper">
      <div class="avatar-ring"></div>
      <img :src="profile.avatar" :alt="profile.name" class="avatar" />
    </div>
    
    <div class="profile-info">
      <h1 class="name">{{ profile.name }}</h1>
      <p class="title">{{ profile.title }}</p>
      
      <div class="bio">{{ profile.bio }}</div>
      
      <div class="tags">
        <span 
          v-for="(desc, index) in profile.description" 
          :key="index"
          class="tag"
        >
          {{ desc }}
        </span>
      </div>
      
<!--      <div class="location">-->
<!--        <i class="icon">📍</i>-->
<!--        <span>{{ profile.location }}</span>-->
<!--      </div>-->
      
      <!-- 社交链接 -->
      <div class="social-links">
        <div class="links-container">
          <a
            v-for="(link, index) in socialLinks"
            :key="link.name"
            :href="link.url"
            :title="link.tip"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            @mouseenter="currentTip = link.tip"
            @mouseleave="currentTip = defaultTip"
          >
            <img :src="link.icon" :alt="link.name" class="icon" />
          </a>
        </div>
        <div class="tip">{{ currentTip }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import profileData from '@/config/profile.json'
import socialLinksData from '@/config/social-links.json'

const profile = reactive(profileData)
const socialLinks = reactive(socialLinksData)

const defaultTip = '通过这里联系我吧'
const currentTip = ref(defaultTip)
</script>

<style scoped lang="scss">
.profile-card {
  padding: 2.5rem;
  text-align: center;
  animation: slideInLeft 0.8s $ease-out-expo 0.4s both;
  
  .avatar-wrapper {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto 1.5rem;
    
    .avatar-ring {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 3px solid transparent;
      border-radius: 50%;
      background: 
        linear-gradient($background-light, $background-light) padding-box,
        $gradient-neon border-box;
      animation: rotate 4s linear infinite;
      
      &::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-radius: 50%;
        background: $gradient-neon;
        filter: blur(10px);
        opacity: 0.5;
        z-index: -1;
      }
    }
    
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      z-index: 1;
      border: 4px solid $background-light;
    }
  }
  
  .profile-info {
    .name {
      font-family: 'Orbitron', sans-serif;
      font-size: 2rem;
      font-weight: bold;
      color: $neon-blue;
      text-shadow: 0 0 10px $neon-blue;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }
    
    .title {
      font-size: 1.2rem;
      color: $text-secondary;
      margin-bottom: 1.5rem;
      letter-spacing: 0.1em;
    }
    
    .bio {
      font-size: 1rem;
      line-height: 1.6;
      color: $text-primary;
      margin-bottom: 1.5rem;
      padding: 0 1rem;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      justify-content: center;
      margin-bottom: 1.5rem;
      
      .tag {
        padding: 0.5rem 1rem;
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: $radius-md;
        font-size: 0.9rem;
        color: $text-primary;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(0, 240, 255, 0.2);
          border-color: $neon-blue;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
          transform: translateY(-2px);
        }
      }
    }
    
    .location {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: $radius-md;
      font-size: 0.95rem;
      color: $text-secondary;
      margin-bottom: 1.5rem;
      
      .icon {
        font-size: 1.1rem;
      }
    }
    
    .social-links {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0, 240, 255, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: $radius-md;
      padding: 1rem;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(5px);
        
        .tip {
          opacity: 1;
        }
      }
      
      .links-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s $ease-out-expo;
          
          &:hover {
            background: rgba(0, 240, 255, 0.2);
            border-color: $neon-blue;
            transform: scale(1.15);
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
          }
          
          &:active {
            transform: scale(1);
          }
          
          .icon {
            width: 24px;
            height: 24px;
            object-fit: contain;
            transition: transform 0.3s ease;
          }
        }
      }
      
      .tip {
        font-size: 0.9rem;
        color: $text-secondary;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        min-height: 1.2em;
      }
    }
  }
}

@media (max-width: 768px) {
  .profile-card {
    padding: 2rem 1.5rem;
    
    .avatar-wrapper {
      width: 120px;
      height: 120px;
    }
    
    .profile-info {
      .name {
        font-size: 1.6rem;
      }
      
      .title {
        font-size: 1rem;
      }
      
      .bio {
        font-size: 0.95rem;
        padding: 0;
      }
      
      .social-links {
        .links-container {
          .social-link {
            width: 36px;
            height: 36px;
            
            .icon {
              width: 22px;
              height: 22px;
            }
          }
        }
        
        .tip {
          display: none;
        }
      }
    }
  }
}
</style>

