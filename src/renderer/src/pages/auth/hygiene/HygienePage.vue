<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import hygieneService from '@/utils/services/hygiene'

const store = useStore()
const router = useRouter()

const isLoading = ref(false)
const questions = ref([])
const employee = store.getters['auth/_employee']
const state = reactive({
  current: 0,
  answers: []
})

const getQuestions = () => {
  isLoading.value = true
  hygieneService.getQuestions().then((result) => {
    questions.value = result.data
    isLoading.value = false
  })
}

const nextQuestion = (isClear) => {
  const answer = {
    staffId: employee.staffId,
    machineId: 0,
    isClear: isClear ? 1 : 0,
    questionId: questions.value[state.current].id
  }

  if (state.current < questions.value.length - 1) {
    state.current += 1
    state.answers.push(answer)
  } else if (state.current === questions.value.length - 1) {
    state.answers.push(answer)

    isLoading.value = true
    hygieneService.sendAnswers(state.answers).then(() => {
      isLoading.value = false
      router.push({ path: '/' })
    })
  }
}

onBeforeMount(() => {
  getQuestions()
})
</script>

<template>
  <v-card :loading="isLoading" :disabled="isLoading" width="800px">
    <template #title>
      <v-list-item>
        <template #prepend>
          <v-avatar color="grey-darken-4">{{ state.current + 1 }}</v-avatar>
        </template>
        <v-list-item-title class="text-h5">{{ questions[state.current]?.title }}</v-list-item-title>
      </v-list-item>
    </template>
    <v-card-text></v-card-text>
    <v-card-actions class="d-flex align-center justify-end">
      <v-btn
        variant="elevated"
        prepend-icon="mdi-check"
        color="grey-darken-4"
        @click="nextQuestion(true)"
        >Evet</v-btn
      >
      <v-btn
        variant="elevated"
        prepend-icon="mdi-close"
        color="indigo-darken-3"
        @click="nextQuestion(false)"
        >Hayır</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
@/utils/services/hygiene
