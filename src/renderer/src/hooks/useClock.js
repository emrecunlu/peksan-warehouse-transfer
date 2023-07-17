import { computed, ref } from 'vue'
import { addSeconds, format, setHours, startOfDay, endOfDay, isWithinInterval } from 'date-fns'

export default function useClock() {
  const time = ref(new Date())

  const interval = setInterval(() => {
    time.value = addSeconds(time.value, 1)
    console.log('çalışıyor!')
  }, 1000)

  const currentTime = computed(() => format(time.value, 'HH:mm:ss'))
  const shift = computed(() => {
    const start = setHours(startOfDay(time.value), 7)
    const end = setHours(endOfDay(time.value), 19)

    return isWithinInterval(time.value, { start, end }) ? 1 : 2
  })
  const clear = () => clearInterval(interval)

  return { currentTime, clear, shift }
}
