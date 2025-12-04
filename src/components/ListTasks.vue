<template>
  <v-list
    lines="two"
    class="elevation-1 rounded"
  >
    <v-list-item
      v-for="task in tasksStore.filteredTasks()"
      :key="task.id"
    >
      <template v-slot:prepend>
        <v-checkbox
          :model-value="task.completed"
          @update:model-value="tasksStore.toggleTask(task.id)"
          density="comfortable"
          class="d-flex align-center"
        />
      </template>

      <v-list-item-title
        :class="{ 'text-decoration-line-through text-grey': task.completed }"
        class="font-weight-medium"
      >
        {{ task.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Создано: {{ useFormatDate(task.createdAt) }}
        | Обновлено: {{ useFormatDate(task.updatedAt) }}
        <span v-if="task.completed">
          | Завершено: {{ useFormatDate(task.completedAt) }}
        </span>
      </v-list-item-subtitle>

      <template v-slot:append>
        <div
          v-if="tasksStore.pendingDeletions.has(task.id)"
          class="d-flex align-center"
        >
          <v-chip
            color="error"
            size="small"
            class="mr-2"
          >
            Удаление через {{ tasksStore.deletionTimers[task.id]?.timeLeft || 10 }}
          </v-chip>
          <v-btn
            @click="tasksStore.cancelDeletion(task.id)"
            variant="text"
            color="warning"
            size="small"
          >
            Отмена
          </v-btn>
        </div>
        <v-btn
          v-else
          icon
          @click="tasksStore.startDeletion(task.id)"
          variant="text"
          color="error"
          size="small"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useFormatDate } from '@/utils/formatDate'

const props = defineProps(['tasksStore'])

</script>

<style scoped></style>