<template>
  <transition name="slide-up">
    <div v-if="appStore.musicPlayerVisible" class="music-player glass">
      <div class="player-header">
        <h3 class="title">音乐播放器</h3>
        <button class="close-btn" @click="closePlayer">✕</button>
      </div>
      
      <div class="player-body">
        <!-- 搜索区域 -->
        <div class="search-area">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索歌曲..."
            class="search-input"
            @keyup.enter="searchMusic"
          />
          <button class="search-btn" @click="searchMusic">搜索</button>
        </div>
        
        <!-- 当前播放 -->
        <div v-if="musicStore.currentMusic" class="current-music">
          <img 
            :src="musicStore.currentMusic.cover" 
            alt="cover"
            class="cover"
            :class="{ rotating: musicStore.playing }"
          />
          <div class="music-info">
            <p class="name">{{ musicStore.currentMusic.name }}</p>
            <p class="artist">{{ musicStore.currentMusic.artist }}</p>
          </div>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-area">
          <span class="time">{{ formatTime(musicStore.currentTime) }}</span>
          <div class="progress-bar" @click="seekMusic">
            <div 
              class="progress" 
              :style="{ width: musicStore.progress + '%' }"
            ></div>
          </div>
          <span class="time">{{ formatTime(musicStore.duration) }}</span>
        </div>
        
        <!-- 控制按钮 -->
        <div class="controls">
          <button class="control-btn" @click="playPrev">⏮</button>
          <button class="control-btn play-btn" @click="togglePlay">
            {{ musicStore.playing ? '⏸' : '▶' }}
          </button>
          <button class="control-btn" @click="playNext">⏭</button>
          <div class="volume-control">
            <span>🔊</span>
            <input
              v-model="musicStore.volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              class="volume-slider"
              @input="changeVolume"
            />
          </div>
        </div>
        
        <!-- 搜索结果列表 -->
        <div v-if="searchResults.length > 0" class="search-results">
          <div class="results-header">
            <h4>搜索结果</h4>
            <button class="clear-btn" @click="clearResults">清空</button>
          </div>
          <div class="results-list">
            <div
              v-for="song in searchResults"
              :key="song.id"
              class="song-item"
              :class="{ active: musicStore.currentMusic?.id === song.id }"
              @click="playSong(song)"
            >
              <img :src="song.cover" alt="cover" class="song-cover" />
              <div class="song-info">
                <p class="song-name">{{ song.name }}</p>
                <p class="song-artist">{{ song.artist }}</p>
              </div>
              <span class="play-icon">▶</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 隐藏的 audio 元素 -->
      <audio
        ref="audioRef"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetadata"
        @ended="onEnded"
      ></audio>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useMusicStore } from '@/stores/music'
import { searchMusic as searchMusicAPI, getMusicUrl } from '@/api'
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const musicStore = useMusicStore()

const searchKeyword = ref('')
const searchResults = ref<any[]>([])
const audioRef = ref<HTMLAudioElement | null>(null)

const closePlayer = () => {
  appStore.toggleMusicPlayer()
}

const searchMusic = async () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  
  try {
    const data: any = await searchMusicAPI(searchKeyword.value)
    if (data.result?.songs) {
      searchResults.value = data.result.songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        artist: song.artists?.map((a: any) => a.name).join(' / ') || '未知',
        cover: song.album?.picUrl || '/images/icon/music.png',
        url: ''
      }))
    } else {
      ElMessage.info('没有找到相关歌曲')
    }
  } catch (error) {
    ElMessage.error('搜索失败')
  }
}

const playSong = async (song: any) => {
  try {
    const data: any = await getMusicUrl(song.id)
    if (data.data?.[0]?.url) {
      song.url = data.data[0].url
      musicStore.setCurrentMusic(song)
      musicStore.setPlaying(true)
      
      if (audioRef.value) {
        audioRef.value.src = song.url
        audioRef.value.play()
      }
    } else {
      ElMessage.error('该歌曲无法播放')
    }
  } catch (error) {
    ElMessage.error('播放失败')
  }
}

const togglePlay = () => {
  if (!musicStore.currentMusic) {
    ElMessage.warning('请先选择歌曲')
    return
  }
  
  if (audioRef.value) {
    if (musicStore.playing) {
      audioRef.value.pause()
      musicStore.setPlaying(false)
    } else {
      audioRef.value.play()
      musicStore.setPlaying(true)
    }
  }
}

const playPrev = () => {
  musicStore.playPrev()
  if (musicStore.currentMusic) {
    playSong(musicStore.currentMusic)
  }
}

const playNext = () => {
  musicStore.playNext()
  if (musicStore.currentMusic) {
    playSong(musicStore.currentMusic)
  }
}

const seekMusic = (e: MouseEvent) => {
  if (!audioRef.value) return
  
  const target = e.currentTarget as HTMLElement
  const percent = e.offsetX / target.offsetWidth
  audioRef.value.currentTime = percent * musicStore.duration
}

const changeVolume = () => {
  if (audioRef.value) {
    audioRef.value.volume = musicStore.volume
  }
}

const onTimeUpdate = () => {
  if (audioRef.value) {
    musicStore.setCurrentTime(audioRef.value.currentTime)
    musicStore.setProgress((audioRef.value.currentTime / musicStore.duration) * 100)
  }
}

const onLoadedMetadata = () => {
  if (audioRef.value) {
    musicStore.setDuration(audioRef.value.duration)
  }
}

const onEnded = () => {
  playNext()
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const clearResults = () => {
  searchResults.value = []
  searchKeyword.value = ''
}

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = musicStore.volume
  }
})
</script>

<style scoped lang="scss">
@use 'sass:color';
.music-player {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  animation: slideInRight 0.5s $ease-out-expo;
  
  .player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid $glass-border;
    
    .title {
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem;
      color: $neon-blue;
      text-shadow: 0 0 10px $neon-blue;
      margin: 0;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: $text-secondary;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        color: $neon-pink;
        transform: rotate(90deg);
      }
    }
  }
  
  .player-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    
    .search-area {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      
      .search-input {
        flex: 1;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid $glass-border;
        border-radius: $radius-md;
        color: $text-primary;
        font-size: 0.95rem;
        
        &:focus {
          outline: none;
          border-color: $neon-blue;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }
        
        &::placeholder {
          color: $text-secondary;
        }
      }
      
      .search-btn {
        padding: 0.8rem 1.5rem;
        background: $neon-blue;
        border: none;
        border-radius: $radius-md;
        color: $background-dark;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: color.adjust($neon-blue, $lightness: 10%);
          box-shadow: 0 0 15px $neon-blue;
        }
      }
    }
    
    .current-music {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: rgba(0, 240, 255, 0.05);
      border-radius: $radius-md;
      
      .cover {
        width: 60px;
        height: 60px;
        border-radius: $radius-md;
        object-fit: cover;
        border: 2px solid $neon-blue;
        
        &.rotating {
          animation: rotate 10s linear infinite;
        }
      }
      
      .music-info {
        flex: 1;
        
        .name {
          font-size: 1rem;
          font-weight: bold;
          color: $text-primary;
          margin-bottom: 0.3rem;
        }
        
        .artist {
          font-size: 0.9rem;
          color: $text-secondary;
        }
      }
    }
    
    .progress-area {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      .time {
        font-family: 'JetBrainsMono', monospace;
        font-size: 0.85rem;
        color: $text-secondary;
        min-width: 45px;
      }
      
      .progress-bar {
        flex: 1;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        cursor: pointer;
        overflow: hidden;
        
        .progress {
          height: 100%;
          background: $gradient-neon;
          transition: width 0.1s linear;
          box-shadow: 0 0 10px $neon-blue;
        }
      }
    }
    
    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      
      .control-btn {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid $glass-border;
        border-radius: 50%;
        color: $text-primary;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(0, 240, 255, 0.2);
          border-color: $neon-blue;
          transform: scale(1.1);
        }
        
        &.play-btn {
          width: 50px;
          height: 50px;
          background: $neon-blue;
          color: $background-dark;
          font-size: 1.4rem;
          
          &:hover {
            background: color.adjust($neon-blue, $lightness: 10%);
            box-shadow: 0 0 15px $neon-blue;
          }
        }
      }
      
      .volume-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: 1rem;
        
        .volume-slider {
          width: 80px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          outline: none;
          -webkit-appearance: none;
          
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            background: $neon-blue;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px $neon-blue;
          }
        }
      }
    }
    
    .search-results {
      .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        h4 {
          margin: 0;
          color: $text-primary;
          font-size: 1rem;
        }
        
        .clear-btn {
          padding: 0.4rem 0.8rem;
          background: none;
          border: 1px solid $glass-border;
          border-radius: $radius-sm;
          color: $text-secondary;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            border-color: $neon-pink;
            color: $neon-pink;
          }
        }
      }
      
      .results-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 300px;
        overflow-y: auto;
        
        .song-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid transparent;
          border-radius: $radius-md;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover,
          &.active {
            background: rgba(0, 240, 255, 0.1);
            border-color: $neon-blue;
            
            .play-icon {
              opacity: 1;
            }
          }
          
          .song-cover {
            width: 40px;
            height: 40px;
            border-radius: $radius-sm;
            object-fit: cover;
          }
          
          .song-info {
            flex: 1;
            
            .song-name {
              font-size: 0.9rem;
              color: $text-primary;
              margin-bottom: 0.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            
            .song-artist {
              font-size: 0.8rem;
              color: $text-secondary;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          
          .play-icon {
            color: $neon-blue;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
        }
      }
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s $ease-out-expo;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

@media (max-width: 768px) {
  .music-player {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 80vh;
    border-radius: $radius-lg $radius-lg 0 0;
  }
}
</style>

