<script setup>
import TransferForm from '@/components/Dat/TransferForm.vue'
import MaterialList from '@/components/Dat/MaterialList.vue'
import CardTitle from '@/components/Dat/CardTitle.vue'
import { reactive } from 'vue'
import { provide } from 'vue'
import { computed } from 'vue'
import Decimal from 'decimal.js'
import rawMaterialService from '@/utils/services/rawMaterial'
import store from '@/store'
import useClock from '@/hooks/useClock'
import { onBeforeUnmount } from 'vue'
import { da } from 'date-fns/locale'
import { toDate } from 'date-fns'
import SnackbarHelper from '@/utils/helpers/SnackbarHelper'

const state = reactive({
  barrel: null,
  machine: null,
  workOrder: null,
  materials: null,
  isColor: false,
  tmp: null,
  isLoading: false
})

const employee = store.getters['auth/_employee']
const { shift, clear } = useClock()
provide('state', state)

const isCompleted = computed(() => {
  return state.materials
    ? state.materials?.every((item) => {
        const serialTotalAmount = item.series.reduce((curr, e) => {
          const amount = new Decimal(e.amount)

          return parseFloat(amount.plus(curr))
        }, 0)

        return new Decimal(item.dispatchAmount).equals(serialTotalAmount)
      })
    : false
})

const handleClick = () => {
  const data = {
    isColor: state.isColor,
    workOrder: state.workOrder?.workOrder ?? '',
    staffId: parseInt(employee.staffId),
    machineId: parseInt(state.machine),
    shift: shift.value,
    entranceWareHouse: parseInt(state.machine),
    materials: state.materials.map((material) => ({
      stockCode: material.rawCode,
      amount: material.dispatchAmount,
      ratio: material.ratio,
      serial: material.series.map((serie) => ({
        serialNo: serie.serialNo,
        lotNo: serie.lotNo,
        amount: serie.amount,
        ratio: serie.ratio
      }))
    }))
  }

  state.isLoading = true
  rawMaterialService.transfer(data).then((result) => {
    state.barrel = null
    state.machine = null
    state.materials = null
    state.tmp = null
    state.isLoading = false

    SnackbarHelper.showSuccess('Transfer başarılı.')
  })
}

onBeforeUnmount(() => {
  clear()
})
</script>

<template>
  <v-card :disabled="state.isLoading" :loading="state.isLoading">
    <template #prepend>
      <card-title :work-order="state.workOrder"></card-title>
    </template>
    <v-card-text>
      <transfer-form> </transfer-form>
      <v-divider class="my-4"></v-divider>
      <material-list v-if="state.materials"></material-list>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        :disabled="!isCompleted"
        color="indigo"
        variant="elevated"
        prepend-icon="mdi-transfer"
        @click="handleClick"
        >Transfer</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
