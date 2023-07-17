<script setup>
import { onBeforeMount, ref } from 'vue'
import employeeService from '@/utils/services/employee'
import { toRef } from 'vue'

const props = defineProps({
  selected: {
    type: [Object, null],
    required: true
  }
})

const { value: selected } = toRef(props.selected)
const emit = defineEmits(['change'])

const isLoading = ref(false)
const employees = ref([])

const getEmployees = async () => {
  isLoading.value = true
  employeeService.getAll('H').then((result) => {
    console.log(result)
    employees.value = result.data
    isLoading.value = false
  })
}

onBeforeMount(() => {
  getEmployees()
})
</script>

<template>
  <v-autocomplete
    v-model="selected"
    :loading="isLoading"
    :disabled="isLoading"
    variant="filled"
    return-object
    label="Personel"
    :item-title="(item) => `${item.staffId} - ${item.firstName} ${item.lastName}`"
    :items="employees"
    @update:model-value="(val) => emit('change', val)"
  ></v-autocomplete>
</template>
