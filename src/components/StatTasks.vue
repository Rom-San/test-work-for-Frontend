<template>
  <v-card class="my-6">
    <v-card-text>
      <p>Всего задач: {{ tasksStore.allTasks }}</p>
      <p>Активных: {{ tasksStore.activeTasks }}</p>
      <p>Завершенных: {{ tasksStore.completedTasks }}</p>
      <p>Процент завершения: {{ tasksStore.getCompletionPercentage }}%</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

const props = defineProps(['tasksStore'])

</script>
