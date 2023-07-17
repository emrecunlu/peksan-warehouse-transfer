<script setup>
import { computed } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  workOrder: {
    type: [Object, null],
    default: null
  }
})

const { workOrder } = toRefs(props)

const workOrderInfo = computed(() => {
  if (!workOrder.value) {
    return 'Lütfen iş emri bilgisi seçiniz.'
  }

  return `${workOrder.value.workOrder} - ${workOrder.value.stockCode} - ${workOrder.value.color} - ${workOrder.value.amount} KG`
})
</script>

<template>
  <h1 class="text-h6 text-indigo">{{ workOrderInfo }}</h1>
</template>
