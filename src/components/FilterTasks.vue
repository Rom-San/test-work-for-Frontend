<template>
  <div class="filter-section mb-4">
    <v-btn
      @click="tasksStore.currentFilter = 'all'"
      :class="{ 'bg-primary': tasksStore.currentFilter === 'all' }"
      variant="tonal"
      class="mr-2"
    >
      Все ({{ tasksStore.allTasks }})
    </v-btn>
    <v-btn
      @click="tasksStore.currentFilter = 'active'"
      :class="{ 'bg-primary': tasksStore.currentFilter === 'active' }"
      variant="tonal"
      class="mr-2"
    >
      Активные ({{ tasksStore.activeTasks }})
    </v-btn>
    <v-btn
      @click="tasksStore.currentFilter = 'completed'"
      :class="{ 'bg-primary': tasksStore.currentFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
    >
      Завершенные ({{ tasksStore.completedTasks }})
    </v-btn>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['tasksStore'])

</script>

<style scoped></style>