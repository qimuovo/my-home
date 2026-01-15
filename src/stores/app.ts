import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 加载状态
    loading: true,
    // 背景图片加载完成
    bgLoaded: false,
    // 当前背景图片索引
    currentBgIndex: 1,
    // 音乐播放器显示状态
    musicPlayerVisible: false,
    // 屏幕宽度
    screenWidth: window.innerWidth,
    // 是否移动端
    isMobile: window.innerWidth < 768
  }),
  
  actions: {
    setLoading(status: boolean) {
      this.loading = status
    },
    
    setBgLoaded(status: boolean) {
      this.bgLoaded = status
    },
    
    setCurrentBgIndex(index: number) {
      this.currentBgIndex = index
    },
    
    toggleMusicPlayer() {
      this.musicPlayerVisible = !this.musicPlayerVisible
    },
    
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
      this.isMobile = window.innerWidth < 768
    }
  }
})

