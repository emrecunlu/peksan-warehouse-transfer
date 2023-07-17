<script setup>
import SnackbarHelper from '@/utils/helpers/SnackbarHelper'
import rawMaterialService from '@/utils/services/rawMaterial'
import { computed } from 'vue'
import { toRefs, ref, reactive, onBeforeMount, watch } from 'vue'
import { useModalRef } from 'vue-modal-provider'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  materials: {
    type: Array,
    required: true
  }
})
const { items, materials } = toRefs(props)
const { visible, remove, resolve } = useModalRef()
const isLoading = ref(false)
const search = ref('')

const state = reactive({
  selected: null,
  ratio: null,
  filtered: items.value,
  ratios: []
})

const isAdded = (stockCode) =>
  computed(() => (materials.value.find((e) => e.rawCode === stockCode) ? true : false))

const getRatios = async () => {
  isLoading.value = true
  rawMaterialService.getRatios().then((result) => {
    state.ratios = result.data
    isLoading.value = false
  })
}

const handleClick = () => {
  if (materials.value.find((e) => e.rawCode === state.selected.stockCode)) {
    SnackbarHelper.showError('Zaten böyle bir kırma serisi eklediniz!')
    return
  }

  resolve({ selected: state.selected, ratio: parseInt(state.ratio) })
  remove()
}

onBeforeMount(() => {
  getRatios()
})

watch(search, (val) => {
  state.filtered =
    val === ''
      ? items.value
      : items.value.filter(
          (item) =>
            item.stockName.toString().toLowerCase().includes(search.value.toLowerCase()) ||
            item.stockCode.toString().includes(search.value.toLowerCase())
        )
})
</script>

<template>
  <v-dialog v-model="visible" full-width max-width="1200" @update:model-value="remove()">
    <v-card>
      <v-toolbar>
        <v-toolbar dark color="indigo">
          <v-toolbar-title>Kırma Seri Listesi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon="mdi-close" @click="remove()"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-toolbar>
      <v-card-text>
        <div class="field__container">
          <v-text-field
            v-model="search"
            class="field"
            label="Arama"
            hide-details
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <template v-if="state.selected">
            <v-select
              v-model="state.ratio"
              :items="state.ratios"
              :item-value="(item) => parseInt(item)"
              :loading="isLoading"
              :disabled="isLoading"
              :item-title="(item) => `%${item}`"
              class="field smaller"
              hide-details
              label="Oran"
            ></v-select>
            <div>
              <v-btn
                :disabled="!state.ratio"
                block
                height="100%"
                color="indigo"
                prepend-icon="mdi-plus"
                @click="handleClick"
                >EKLE</v-btn
              >
            </div>
          </template>
        </div>
        <v-divider class="my-4"></v-divider>
        <v-table hover fixed-header height="500">
          <thead>
            <tr>
              <th>#</th>
              <th>Stok İsmi</th>
              <th>Stok Kodu</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in state.filtered"
              :key="item.id"
              :class="{
                'bg-indigo': state.selected?.id === item.id,
                'bg-green-darken-1': isAdded(item.stockCode).value
              }"
              @click="state.selected = item"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.stockName }}</td>
              <td>{{ item.stockCode }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.field__container {
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
}

.field {
  flex: 2;
}

.field.smaller {
  flex: 1;
}
</style>
