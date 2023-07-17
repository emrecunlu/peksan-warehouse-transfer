<script setup>
import rawMaterialService from '@/utils/services/rawMaterial'
import { inject } from 'vue'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'

const isLoading = ref(false)
const barrels = ref([])
const state = inject('state')

const getBarrels = async () => {
  isLoading.value = true
  rawMaterialService.getBarrels().then((result) => {
    barrels.value = result.data
    isLoading.value = false
  })
}

const handleChange = async (barrelKg) => {
  state.isLoading = true
  rawMaterialService
    .getMaterials(state.workOrder?.workOrder ?? '', barrelKg, state.isColor ?? false)
    .then((result) => {
      state.tmp = result.data
      state.materials = result.data.map((item) => ({ ...item, series: [] }))
      state.isLoading = false
    })
}

onBeforeMount(() => {
  getBarrels()
})
</script>

<template>
  <v-autocomplete
    v-model="state.barrel"
    label="Varil"
    hide-details
    placeholder="Lütfen varil kg seçiniz."
    :disabled="!state.workOrder"
    :item-value="(item) => item"
    :item-title="(item) => `${item} KG`"
    :loading="isLoading"
    :items="barrels"
    @update:model-value="handleChange"
  ></v-autocomplete>
</template>
