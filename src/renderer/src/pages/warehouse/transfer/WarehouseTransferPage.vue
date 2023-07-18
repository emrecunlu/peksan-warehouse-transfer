<script setup>
import { ref } from 'vue'
import RawMaterialTab from '@/pages/warehouse/tabs/RawMaterialTab.vue'
import ColorTab from '@/pages/warehouse/tabs/ColorTab.vue'
import FractureTab from '@/pages/warehouse/tabs/FractureTab.vue'

const tab = ref(0)

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
        <component :is="tabs[tab].tab"></component>
      </v-card-text>
    </v-card>
  </v-container>
</template>
