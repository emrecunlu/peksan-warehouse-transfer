<script setup>
import { ref } from 'vue'
import { toRefs } from 'vue'
import { useModalRef } from 'vue-modal-provider'
import AddSerialForm from '../Dat/AddSerialForm.vue'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  material: {
    type: Object,
    required: true
  }
})

const { visible, remove } = useModalRef()
const { data: serials, material } = toRefs(props)
const isAdded = (id) => computed(() => material.value.series.find((e) => e.id === id))
const selected = ref(null)
</script>

<template>
  <v-dialog v-model="visible" full-width max-width="1200" @update:model-value="remove()">
    <v-card>
      <v-toolbar dark color="indigo">
        <v-toolbar-title>Seri Listesi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon="mdi-close" @click="remove()"></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <add-serial-form
          v-if="selected"
          :material="material"
          :serial="selected"
          @close="remove()"
        ></add-serial-form>
        <v-divider v-if="selected" class="my-4"></v-divider>
        <v-table hover fixed-header height="500">
          <thead>
            <tr>
              <th>#</th>
              <th>Seri Numarası</th>
              <th>Renk</th>
              <th>Lot No</th>
              <th>Miktar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in serials"
              :key="index"
              :class="{
                'bg-indigo': selected?.id === item.id,
                'bg-green-darken-1': isAdded(item.id).value
              }"
              @click="selected = item"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.serialNo }}</td>
              <td>{{ item.color }}</td>
              <td>{{ item.lotNo }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
