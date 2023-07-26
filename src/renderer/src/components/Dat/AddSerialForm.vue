<script setup>
import Decimal from 'decimal.js'
import { toRefs, computed, ref, watch } from 'vue'
import { vMaska } from 'maska'
import SnackbarHelper from '@/utils/helpers/SnackbarHelper'

const props = defineProps({
  material: {
    type: Object,
    required: true
  },
  serial: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const { material, serial } = toRefs(props)
const remaningAmount = computed(() => {
  const seriesAmount = material.value.series.reduce((prev, curr) => {
    const amount = new Decimal(curr.amount)

    return parseFloat(amount.plus(prev))
  }, 0)

  const dispatchAmount = new Decimal(material.value.dispatchAmount)

  return parseFloat(dispatchAmount.minus(seriesAmount))
})
const amount = ref(remaningAmount.value)

const handleSubmit = () => {
  // girilen seri miktarı kalan sevk kg'den büyük ise hata ver.
  const entryValue = new Decimal(amount.value)

  if (material.value.series.find((item) => item.id === serial.value.id)) {
    SnackbarHelper.showError('Böyle bir seri zaten girilmiş!')
    return
  }

  if (entryValue.lessThanOrEqualTo(0)) {
    SnackbarHelper.showError("Girilen miktar 0'dan büyük olmalı!")
    return
  }

  if (entryValue.greaterThan(remaningAmount.value)) {
    SnackbarHelper.showError('Girilen miktar kalan sevk miktarından fazla olamaz!')
    return
  }

  // girilen seri miktari seçili olan serinin miktarından büyük olamaz
  if (entryValue.greaterThan(serial.value.amount)) {
    SnackbarHelper.showError('Girilen miktar seri miktarından fazla olamaz!')
    return
  }

  const ratio = parseFloat(
    entryValue.dividedBy(material.value.dispatchAmount).times(material.value.ratio)
  )

  material.value.series.push({
    ...serial.value,
    amount: parseFloat(amount.value),
    ratio
  })

  if (remaningAmount.value === 0) {
    emit('close')
  }
}

watch(
  serial,
  (val) => {
    if (new Decimal(remaningAmount.value).greaterThan(val.amount)) {
      amount.value = val.amount
      console.log('büyük')
    } else {
      amount.value = remaningAmount.value
      console.log('Büyük değil')
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="field__container">
    <v-text-field
      class="field"
      variant="plain"
      label="Stok Kodu"
      readonly
      hide-details
      :model-value="material.rawCode"
    ></v-text-field>
    <v-text-field v-model="amount" v-maska class="field" hide-details label="Miktar"></v-text-field>
    <div>
      <v-btn
        variant="elevated"
        color="indigo"
        prepend-icon="mdi-plus"
        height="100%"
        block
        @click="handleSubmit"
        >Ekle</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.field {
  display: block;
  flex: 1;
}

.field__container {
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
}

.add_button {
  display: block;
  height: 100%;
}
</style>
