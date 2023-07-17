<script setup>
import Snackbar from './components/common/Snackbar.vue'
import { ModalProvider } from 'vue-modal-provider'
</script>

<template>
  <modal-provider>
    <router-view></router-view>
    <snackbar></snackbar>
  </modal-provider>
</template>
