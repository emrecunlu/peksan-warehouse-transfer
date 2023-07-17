<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const snackbar = computed(() => store.state.snackbar)
</script>

<template>
  <v-snackbar
    v-if="snackbar.active"
    v-model="snackbar.active"
    position="fixed"
    :color="snackbar?.type === 'error' ? 'red' : 'green'"
    location="bottom right"
    :timeout="snackbar.timeout"
    @update:model-value="store.dispatch('snackbar/close')"
  >
    <div class="text-subtitle-1 pb-2">{{ snackbar.type === 'error' ? 'Hata' : 'Başarılı' }}</div>

    <p>{{ snackbar?.title }}</p>

    <template #actions>
      <v-btn variant="text" color="white" @click="snackbar.active = false">Kapat</v-btn>
    </template>
  </v-snackbar>
</template>
