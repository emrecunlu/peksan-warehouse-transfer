<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SelectEmployee from './components/SelectEmployee.vue'

const store = useStore()
const selected = ref(null)
const router = useRouter()

const handleSubmit = () => {
  store.dispatch('auth/login', selected.value)
  router.push({ path: '/auth/hygenie' })
}
</script>

<template>
  <v-card width="800px">
    <template #title>
      <v-list-item>
        <template #prepend>
          <v-avatar icon="mdi-account" color="grey-darken-4"></v-avatar>
        </template>
        <v-list-item-title>Perssonel Girişi</v-list-item-title>
        <v-list-item-subtitle>Personel Seç</v-list-item-subtitle>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-card-text class="py-8">
      <select-employee :selected="selected" @change="(val) => (selected = val)"></select-employee>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        :disabled="!selected"
        prepend-icon="mdi-login"
        variant="elevated"
        color="grey-darken-4"
        @click="handleSubmit"
        >GİRİŞ YAP</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
