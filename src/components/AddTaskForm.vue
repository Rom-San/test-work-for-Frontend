<template>
  <v-form
    validate-on="submit"
    @submit.prevent="taskAdd"
    class="mb-6"
  >
    <v-text-field
      v-model="newTaskTitle"
      label="Новая задача"
      :rules="[value => !!value || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
    />
    <v-btn
      type="submit"
      color="primary"
      class="mt-2"
    >Добавить</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['addTask'])

const newTaskTitle = ref('')

const taskAdd = () => {
  emit('addTask', newTaskTitle.value)
  newTaskTitle.value = ''
}

</script>
