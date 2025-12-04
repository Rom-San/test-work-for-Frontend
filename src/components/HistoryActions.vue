<template>
  <v-card
    title="Лента изменений"
    class="mb-6"
  >
    <v-list v-if="history.length" lines="two">
      <v-list-item
        v-for="item in history"
        :key="item.id"
        :title="`Задача &laquo${item.shortTitle}&raquo`"
        :subtitle="`${actionsMap[item.action]} ${useFormatDate(item.registerAt)}`"
      />
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { useFormatDate } from '@/utils/formatDate'
import type { TaskHistory } from '@/types/TaskHistory'

const props = defineProps<{
  history: TaskHistory[]
}>()

const actionsMap = {
  added: 'добавлена',
  complited: 'выполнена',
  notcomplited: 'отмечена невыполенной',
  deleted: 'удалена',
}

</script>
