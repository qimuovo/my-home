<template>
  <div class="clock glass">
    <!-- 动态背景层 -->
    <div class="visual-effects">
      <div class="liquid-bg"></div>
      <div class="liquid-bg-2"></div>
      <div class="grid-overlay"></div>
      <div class="scanline"></div>
    </div>
    
    <!-- HUD 装饰框架 -->
    <div class="hud-frame">
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
      <div class="label-tag time-tag">CLOCK</div>
      <div class="label-tag status-tag">STABLE</div>
    </div>

    <!-- 主要内容区域 -->
    <div class="clock-content">
      <!-- 时间显示区域 -->
      <div class="time-section">
        <div class="digital-time">
          <div v-for="(segment, index) in timeSegments" :key="index" class="time-segment" :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="unit-wrapper" :class="segment.class">
              <span class="digit-face">{{ segment.value }}</span>
              <span class="digit-glow">{{ segment.value }}</span>
              <span class="digit-shadow">{{ segment.value }}</span>
            </div>
            <span v-if="segment.separator" class="separator">{{ segment.separator }}</span>
          </div>
        </div>
        
        <!-- 装饰性数据线 -->
        <div class="data-stream">
          <div class="stream-line" v-for="i in 3" :key="i"></div>
        </div>
      </div>
      
      <!-- 右侧指标区域 -->
      <div class="metrics-section">
        <!-- 秒数进度 -->
        <div class="circular-container">
          <svg viewBox="0 0 120 120" class="progress-svg">
            <defs>
              <linearGradient id="clock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: var(--neon-sky)" />
                <stop offset="100%" style="stop-color: var(--neon-peach)" />
              </linearGradient>
            </defs>
            <circle class="progress-bg" cx="60" cy="60" r="54" />
            <circle 
              class="progress-bar" 
              cx="60" 
              cy="60" 
              r="54"
              :style="{ strokeDashoffset: circleProgress }"
            />
            <circle class="progress-dot" cx="60" cy="6" r="3" :style="{ transform: `rotate(${parseInt(time.seconds) * 6}deg)`, transformOrigin: '60px 60px' }" />
          </svg>
          <div class="seconds-display">
            <span class="sec-value">{{ time.seconds }}</span>
            <span class="sec-label">SEC</span>
          </div>
        </div>

        <!-- 日期数据块 -->
        <div class="date-block">
          <div class="date-header">
            <span class="year-text">{{ date.year }}</span>
            <div class="date-sep"></div>
            <span class="day-text">{{ date.day }}</span>
          </div>
          <div class="date-main">
            <span class="month-name">{{ getMonthName(date.month) }}</span>
            <span class="date-num">{{ String(date.date).padStart(2, '0') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部装饰线 -->
    <div class="bottom-deco">
      <div class="deco-bar"></div>
      <div class="deco-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentTime, getCurrentDate } from '@/utils/time'

const time = reactive(getCurrentTime())
const date = reactive(getCurrentDate())

let timer: any

// 计算时间段数据
const timeSegments = computed(() => [
  { value: time.hours, separator: ':', class: 'hours' },
  { value: time.minutes, separator: ':', class: 'minutes' },
  { value: time.seconds, class: 'seconds' }
])

// 计算环形进度（秒数）
const circleProgress = computed(() => {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = (parseInt(time.seconds) / 60) * circumference
  return circumference - progress
})

// 获取月份英文名
const getMonthName = (month: number) => {
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  return months[month - 1]
}

onMounted(() => {
  timer = setInterval(() => {
    Object.assign(time, getCurrentTime())
    Object.assign(date, getCurrentDate())
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.clock {
  --neon-sky: #4fc3f7;
  --neon-cyan: #5ddddd;
  --neon-peach: #ff9a8b;
  
  padding: 1.5rem 2.5rem;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideInDown 0.8s $ease-out-expo;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(79, 195, 247, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
}

// 视觉效果层
.visual-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  .liquid-bg {
    position: absolute;
    top: -20%;
    left: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(circle, rgba(79, 195, 247, 0.12) 0%, transparent 70%);
    filter: blur(40px);
    animation: liquidMove 20s ease-in-out infinite;
  }

  .liquid-bg-2 {
    position: absolute;
    bottom: -10%;
    right: -5%;
    width: 50%;
    height: 70%;
    background: radial-gradient(circle, rgba(255, 154, 139, 0.08) 0%, transparent 70%);
    filter: blur(50px);
    animation: liquidMove 25s ease-in-out infinite reverse;
  }

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(79, 195, 247, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79, 195, 247, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.6;
  }

  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.2), transparent);
    animation: scan 4s linear infinite;
  }
}

// HUD 框架
.hud-frame {
  position: absolute;
  inset: 1rem;
  pointer-events: none;
  border: 1px solid rgba(79, 195, 247, 0.1);
  z-index: 2;

  .corner {
    position: absolute;
    width: 15px;
    height: 15px;
    border: 2px solid $neon-sky;
    
    &.top-left { top: -1px; left: -1px; border-right: none; border-bottom: none; }
    &.top-right { top: -1px; right: -1px; border-left: none; border-bottom: none; }
    &.bottom-left { bottom: -1px; left: -1px; border-right: none; border-top: none; }
    &.bottom-right { bottom: -1px; right: -1px; border-left: none; border-top: none; }
  }

  .label-tag {
    position: absolute;
    font-family: 'JetBrainsMono', monospace;
    font-size: 0.65rem;
    padding: 2px 6px;
    background: rgba(79, 195, 247, 0.15);
    color: $neon-sky;
    letter-spacing: 1px;
    
    &.time-tag { top: -10px; left: 20px; }
    &.status-tag { bottom: -10px; right: 20px; }
  }
}

// 内容区域
.clock-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
}

.time-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .digital-time {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    font-family: 'Orbitron', sans-serif;
    
    .time-segment {
      display: flex;
      align-items: baseline;
      animation: slideInUp 0.6s $ease-out-expo both;
    }
    
    .unit-wrapper {
      position: relative;
      font-size: 4.5rem;
      font-weight: 800;
      line-height: 1;
      min-width: 1.8ch;
      text-align: center;
      
      .digit-face {
        position: relative;
        z-index: 3;
        background-image: linear-gradient(to bottom, #fff 30%, $neon-sky 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        display: block; // 确保块级上下文以正确应用裁剪
      }
      
      .digit-glow {
        position: absolute;
        inset: 0;
        z-index: 2;
        color: $neon-sky;
        filter: blur(12px);
        opacity: 0.6;
        display: block;
      }
      
      .digit-shadow {
        position: absolute;
        top: 6px;
        left: 0;
        width: 100%;
        z-index: 1;
        color: rgba(0, 0, 0, 0.3);
        filter: blur(4px);
        display: block;
      }
      
      &.seconds {
        font-size: 3.5rem;
        opacity: 0.9;
        .digit-face { background-image: linear-gradient(to bottom, #fff 30%, $neon-peach 100%); }
        .digit-glow { color: $neon-peach; }
      }
    }
    
    .separator {
      font-size: 2.8rem;
      color: $neon-sky;
      opacity: 0.6;
      animation: blink 2s steps(2) infinite;
      margin: 0 0.1rem;
    }
  }
  
  .data-stream {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .stream-line {
      height: 1px;
      background: linear-gradient(90deg, $neon-sky, transparent);
      opacity: 0.3;
      
      &:nth-child(1) { width: 60%; animation: stream 3s linear infinite; }
      &:nth-child(2) { width: 40%; animation: stream 4s linear infinite 0.5s; }
      &:nth-child(3) { width: 80%; animation: stream 5s linear infinite 1s; }
    }
  }
}

.metrics-section {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  border-left: 1px dashed rgba(79, 195, 247, 0.2);
  padding-left: 2.5rem;
}

// 秒数进度
.circular-container {
  position: relative;
  width: 80px;
  height: 80px;
  
  .progress-svg {
    transform: rotate(-90deg);
    
    circle {
      fill: none;
      stroke-width: 4;
      
      &.progress-bg { stroke: rgba(255, 255, 255, 0.05); }
      &.progress-bar {
        stroke: url(#clock-gradient);
        stroke-linecap: round;
        stroke-dasharray: 339.292;
        transition: stroke-dashoffset 1s linear;
        filter: drop-shadow(0 0 5px $neon-sky);
      }
      &.progress-dot {
        fill: #fff;
        filter: drop-shadow(0 0 5px $neon-sky);
      }
    }
  }
  
  .seconds-display {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrainsMono', monospace;
    
    .sec-value {
      font-size: 1.4rem;
      font-weight: bold;
      color: #fff;
      line-height: 1;
    }
    
    .sec-label {
      font-size: 0.6rem;
      color: $neon-sky;
      letter-spacing: 2px;
      margin-top: 2px;
    }
  }
}

// 日期块
.date-block {
  text-align: right;
  width: 100%;
  
  .date-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-bottom: 0.5rem;
    
    .year-text {
      font-family: 'JetBrainsMono', monospace;
      font-size: 0.8rem;
      color: $text-secondary;
      letter-spacing: 2px;
    }
    
    .date-sep {
      width: 20px;
      height: 1px;
      background: $neon-sky;
    }
    
    .day-text {
      font-size: 0.8rem;
      color: $neon-sky;
      font-weight: bold;
    }
  }
  
  .date-main {
    display: flex;
    flex-direction: column;
    line-height: 1;
    
    .month-name {
      font-family: 'Orbitron', sans-serif;
      font-size: 1rem;
      color: $neon-peach;
      letter-spacing: 2px;
      margin-bottom: 0.2rem;
    }
    
    .date-num {
      font-family: 'Orbitron', sans-serif;
      font-size: 2.8rem;
      font-weight: 900;
      color: #fff;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }
  }
}

// 底部装饰
.bottom-deco {
  position: absolute;
  bottom: 1rem;
  left: 2.5rem;
  right: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: none;
  
  .deco-bar {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, $neon-sky 0%, transparent 100%);
    opacity: 0.2;
  }
  
  .deco-dots {
    display: flex;
    gap: 4px;
    span {
      width: 3px;
      height: 3px;
      background: $neon-sky;
      border-radius: 50%;
      opacity: 0.4;
      &:nth-child(2) { opacity: 0.7; }
    }
  }
}

// 动画
@keyframes liquidMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10%, 5%) scale(1.1); }
}

@keyframes scan {
  from { transform: translateY(0); opacity: 0; }
  50% { opacity: 1; }
  to { transform: translateY(300px); opacity: 0; }
}

@keyframes stream {
  from { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 0.3; }
  to { transform: translateX(100%); opacity: 0; }
}

@keyframes blink {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.1; }
}

// 响应式
@media (max-width: 1024px) {
  .clock { padding: 2rem; }
  .clock-content { gap: 2rem; }
  .time-section .digital-time .unit-wrapper { font-size: 4.5rem; }
  .metrics-section { padding-left: 2rem; }
}

@media (max-width: 768px) {
  .clock { min-height: auto; }
  .clock-content { flex-direction: column; gap: 2rem; align-items: center; }
  .metrics-section { 
    border-left: none; 
    border-top: 1px dashed rgba(79, 195, 247, 0.2);
    padding-left: 0;
    padding-top: 2rem;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }
  .time-section { align-items: center; }
  .date-block { text-align: center; }
  .date-block .date-header { justify-content: center; }
}

@media (max-width: 480px) {
  .time-section .digital-time { gap: 0.2rem; }
  .time-section .digital-time .unit-wrapper { font-size: 3rem; }
  .time-section .digital-time .separator { font-size: 2rem; }
}
</style>

