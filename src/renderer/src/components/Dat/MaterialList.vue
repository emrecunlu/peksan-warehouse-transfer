<script setup>
import { toRef } from 'vue'
import { inject } from 'vue'
import rawMaterialService from '@/utils/services/rawMaterial'
import { useModal } from 'vue-modal-provider'
import SerialListDialog from '../Modals/SerialListDialog.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import Decimal from 'decimal.js'

const state = inject('state')
const materials = toRef(state, 'materials')
const selected = ref(null)
const isSucceeded = (item) =>
  computed(() => {
    const totalSeriesAmount = item.series.reduce((prev, curr) => {
      const amount = new Decimal(curr.amount)

      return parseFloat(amount.plus(prev))
    }, 0)

    const totalAmount = new Decimal(item.dispatchAmount)

    return totalAmount.equals(totalSeriesAmount)
  })

const modal = useModal(SerialListDialog)

const handleRowClick = async (material) => {
  state.isLoading = true
  selected.value = material
  rawMaterialService.getSeries(material.rawCode).then((result) => {
    state.isLoading = false
    modal.show({
      data: result.data.map((item, id) => ({ id, ...item })),
      material: selected
    })
  })
}
</script>

<template>
  <div>
    <v-table hover>
      <thead>
        <tr>
          <th>Ürün Grubu</th>
          <th>Stok İsmi</th>
          <th>Ham Kodu</th>
          <th>Oran</th>
          <th>Sevk Kg</th>
          <th>Toplam Miktar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in materials"
          :key="index"
          :class="{
            'bg-green-darken-1': isSucceeded(item).value
          }"
          @click="handleRowClick(item, index)"
        >
          <td>{{ item?.productGroup ?? '' }}</td>
          <td>{{ item?.stockName ?? '' }}</td>
          <td>{{ item?.rawCode ?? '' }}</td>
          <td>{{ item?.ratio ?? '' }}</td>
          <td>{{ item?.dispatchAmount ?? '' }}</td>
          <td>{{ item?.totalAmount ?? '' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
