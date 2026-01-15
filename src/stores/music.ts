import { defineStore } from 'pinia'

interface Music {
  id: number
  name: string
  artist: string
  cover: string
  url: string
}

export const useMusicStore = defineStore('music', {
  state: () => ({
    // 当前播放的音乐
    currentMusic: null as Music | null,
    // 播放状态
    playing: false,
    // 播放列表
    playlist: [] as Music[],
    // 当前播放索引
    currentIndex: -1,
    // 音量
    volume: 0.7,
    // 播放进度
    progress: 0,
    // 总时长
    duration: 0,
    // 当前时间
    currentTime: 0
  }),
  
  actions: {
    setCurrentMusic(music: Music) {
      this.currentMusic = music
    },
    
    setPlaying(status: boolean) {
      this.playing = status
    },
    
    setPlaylist(list: Music[]) {
      this.playlist = list
    },
    
    setCurrentIndex(index: number) {
      this.currentIndex = index
    },
    
    setVolume(vol: number) {
      this.volume = vol
    },
    
    setProgress(prog: number) {
      this.progress = prog
    },
    
    setDuration(dur: number) {
      this.duration = dur
    },
    
    setCurrentTime(time: number) {
      this.currentTime = time
    },
    
    playNext() {
      if (this.playlist.length === 0) return
      this.currentIndex = (this.currentIndex + 1) % this.playlist.length
      this.currentMusic = this.playlist[this.currentIndex]
    },
    
    playPrev() {
      if (this.playlist.length === 0) return
      this.currentIndex = this.currentIndex - 1 < 0 
        ? this.playlist.length - 1 
        : this.currentIndex - 1
      this.currentMusic = this.playlist[this.currentIndex]
    }
  }
})

