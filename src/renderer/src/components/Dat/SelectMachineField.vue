<script setup>
import SnackbarHelper from '@/utils/helpers/SnackbarHelper'
import machineService from '@/utils/services/machine'
import workOrderService from '@/utils/services/workOrder'
import { inject } from 'vue'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'

const isLoading = ref(false)
const machines = ref([])

const state = inject('state')

const getMachines = () => {
  isLoading.value = true
  machineService.getAll().then((result) => {
    machines.value = result.data
    isLoading.value = false
  })
}

const handleChange = (val) => {
  state.barrel = null
  state.materials = null

  if (val) {
    state.isLoading = true
    workOrderService.getById(parseInt(val)).then((result) => {
      const workOrders = result.data

      if (workOrders.length > 0) {
        state.workOrder = workOrders[0]
      } else {
        SnackbarHelper.showError('İş emri bulunamadı!')
        state.workOrder = null
      }

      state.isLoading = false
    })
  }
}

onBeforeMount(() => {
  getMachines()
})
</script>

<template>
  <v-autocomplete
    v-model="state.machine"
    full-width
    hide-details
    label="Makine"
    placeholder="Lütfen makine seçiniz."
    clearable
    :items="machines"
    :item-title="(item) => `${item.machineId} - ${item.name}`"
    :item-value="(item) => item.machineId"
    :disabled="isLoading"
    :loading="isLoading"
    @click:clear="state.workOrder = null"
    @update:model-value="handleChange"
  ></v-autocomplete>
</template>
