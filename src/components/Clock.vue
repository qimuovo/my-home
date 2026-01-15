<template>
  <div class="clock glass">
    <div class="time-display">
      <div class="digital-time">
        <span class="time-unit">{{ time.hours }}</span>
        <span class="separator">:</span>
        <span class="time-unit">{{ time.minutes }}</span>
        <span class="separator">:</span>
        <span class="time-unit seconds">{{ time.seconds }}</span>
      </div>
      <div class="date-info">
        <span class="date">{{ date.year }}.{{ String(date.month).padStart(2, '0') }}.{{ String(date.date).padStart(2, '0') }}</span>
        <span class="day">{{ date.day }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentTime, getCurrentDate, getGreeting } from '@/utils/time'

const time = reactive(getCurrentTime())
const date = reactive(getCurrentDate())
const greeting = ref(getGreeting())

let timer: number

onMounted(() => {
  timer = setInterval(() => {
    Object.assign(time, getCurrentTime())
    Object.assign(date, getCurrentDate())
    greeting.value = getGreeting()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.clock {
  padding: 2rem;
  text-align: center;
  animation: slideInDown 0.8s $ease-out-expo;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
    animation: scan 3s infinite;
  }
  
  .time-display {
    .digital-time {
      font-family: 'Orbitron', monospace;
      font-size: 4rem;
      font-weight: bold;
      color: $neon-blue;
      text-shadow: 
        0 0 10px $neon-blue,
        0 0 20px $neon-blue,
        0 0 30px $neon-blue;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .time-unit {
        display: inline-block;
        min-width: 2.5ch;
        
        &.seconds {
          color: $neon-pink;
          text-shadow: 
            0 0 10px $neon-pink,
            0 0 20px $neon-pink;
        }
      }
      
      .separator {
        margin: 0 0.2em;
        animation: blink 1s infinite;
      }
    }
    
    .date-info {
      font-size: 1.2rem;
      color: $text-secondary;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      
      .date {
        font-family: 'JetBrainsMono', monospace;
      }
      
      .day {
        padding: 0.3rem 0.8rem;
        background: rgba(0, 240, 255, 0.1);
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: $radius-sm;
        font-size: 0.9rem;
      }
    }
  }
  
  .greeting {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    color: $text-primary;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0.3;
  }
}

@keyframes scan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@media (max-width: 768px) {
  .clock {
    padding: 1.5rem;
    
    .time-display {
      .digital-time {
        font-size: 2.5rem;
      }
      
      .date-info {
        font-size: 1rem;
      }
    }
    
    .greeting {
      font-size: 1.2rem;
    }
  }
}
</style>

