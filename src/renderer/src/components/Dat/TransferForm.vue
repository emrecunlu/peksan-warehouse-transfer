<script setup>
import { inject } from 'vue'
import SelectBarrelField from './SelectBarrelField.vue'
import SelectMachineField from './SelectMachineField.vue'
import { useModal } from 'vue-modal-provider'
import FractureListDialog from '../Modals/FractureListDialog.vue'
import rawMaterialService from '@/utils/services/rawMaterial'
import NetsisHelper from '@/utils/helpers/NetsisHelper'
import Decimal from 'decimal.js'

const state = inject('state')
const modal = useModal(FractureListDialog)

const handleClick = () => {
  state.isLoading = true
  rawMaterialService.getFractureSeries().then((result) => {
    state.isLoading = false
    modal
      .show({
        materials: state.materials.filter((e) => e?.isFracture),
        items: result.data.map((item, id) => ({
          ...item,
          id,
          stockName: NetsisHelper.Trk(item.stockName)
        }))
      })
      .then(({ selected, ratio }) => {
        state.materials = state.materials.map((item) => ({ ...item, series: [] }))

        const material = {
          workOrder: state.workOrder?.workOrder ?? '',
          stockName: selected.stockName,
          rawCode: selected.stockCode,
          ratio,
          dispatchAmount: parseFloat(new Decimal(state.barrel).times(ratio).dividedBy(100)),
          series: [],
          isFracture: true
        }
        const totalFractureRatio =
          state.materials
            .filter((e) => e?.isFracture)
            .reduce((prev, curr) => prev + curr.ratio, 0) + ratio

        state.materials = state.materials.map((item) => {
          if (item?.isFracture) return item

          const material = state.tmp.find((e) => e.rawCode === item.rawCode)

          const newRatio = parseFloat(
            new Decimal(material.ratio).times(100 - totalFractureRatio).dividedBy(100)
          )
          const newDispatchAmount = parseFloat(
            new Decimal(state.barrel).times(newRatio).dividedBy(100)
          )

          item.ratio = newRatio
          item.dispatchAmount = newDispatchAmount

          return item
        })

        state.materials.push(material)
      })
  })
}
</script>

<template>
  <div class="form__fields">
    <div class="field">
      <select-machine-field></select-machine-field>
    </div>
    <div class="field">
      <select-barrel-field></select-barrel-field>
    </div>
    <div v-if="!state.isColor">
      <v-btn
        :disabled="!state.materials"
        variant="elevated"
        block
        color="indigo"
        height="100%"
        prepend-icon="mdi-plus"
        @click="handleClick"
        >KIRMA EKLE</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.form__fields {
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 20px;
}

.field {
  flex: 1;
}
</style>
