<script setup>
import { ref } from 'vue'
import RawMaterialTab from '@/pages/warehouse/tabs/RawMaterialTab.vue'
import ColorTab from '@/pages/warehouse/tabs/ColorTab.vue'
import FractureTab from '@/pages/warehouse/tabs/FractureTab.vue'

const tab = ref(null)

const tabs = [
  {
    title: 'Hammadde',
    tab: RawMaterialTab
  },
  {
    title: 'Boya',
    tab: ColorTab
  },
  {
    title: 'Kırma',
    tab: FractureTab
  }
]
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="tab" fixed-tabs bg-color="indigo">
        <v-tab v-for="(item, index) in tabs" :key="index" :value="index">{{ item.title }}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="(item, index) in tabs" :key="index" :value="index">
            <component :is="item.tab"></component>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>
