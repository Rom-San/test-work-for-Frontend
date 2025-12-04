<template>
  <v-app>

    <AppBar />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <div>
              <h1 class="text-h4 mb-4">Задачи</h1>

              <FilterTasks :tasks-store="tasksStore" />

              <AddTaskForm @add-task="tasksStore.addTask" />

              <ListTasks :tasks-store="tasksStore" />

              <StatTasks :tasks-store="tasksStore" />

              <HistoryActions :history="tasksStore.history" />
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <div>
              <h1 class="text-h4 mb-4">Мои задачи</h1>

              <FilterTasks :tasks-store="userTasksStore" />

              <AddTaskForm @add-task="userTasksStore.addTask" />

              <ListTasks :tasks-store="userTasksStore" />

              <StatTasks :tasks-store="userTasksStore" />

              <HistoryActions :history="userTasksStore.history" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useUserTasksStore } from '@/stores/userTasks'

const tasksStore = useTasksStore()
const userTasksStore = useUserTasksStore()

const loadTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  if (tasksStore.tasks.length) return
  tasksStore.tasks = [
    {
      id: 1,
      title: 'Изучить Vue 3 Composition API',
      completed: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      completedAt: new Date('2024-01-20')
    },
    {
      id: 2,
      title: 'Написать тестовое задание',
      completed: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      completedAt: null
    },
    {
      id: 3,
      title: 'Рефакторинг legacy кода',
      completed: false,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      completedAt: null
    },
    {
      id: 4,
      title: 'Изучить Pinia и лучшие практики',
      completed: true,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-30'),
      completedAt: new Date('2024-01-30')
    }
  ]
}

const loadUserTasks = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  userTasksStore.tasks = [
    {
      id: 101,
      title: 'Подготовить отчет',
      completed: true,
      createdAt: new Date('2024-02-01T10:00:00'),
      updatedAt: new Date('2024-02-01T10:00:00'),
      completedAt: new Date('2024-02-05T15:30:00')
    },
    {
      id: 102,
      title: 'Создать презентацию',
      completed: false,
      createdAt: new Date('2024-02-10T09:15:00'),
      updatedAt: new Date('2024-02-10T09:15:00'),
      completedAt: null
    },
    {
      id: 103,
      title: 'Провести митинг',
      completed: false,
      createdAt: new Date('2024-02-12T11:00:00'),
      updatedAt: new Date('2024-02-12T11:00:00'),
      completedAt: null
    },
    {
      id: 104,
      title: 'Код ревью',
      completed: true,
      createdAt: new Date('2024-02-08T14:20:00'),
      updatedAt: new Date('2024-02-08T14:20:00'),
      completedAt: new Date('2024-02-09T16:45:00')
    }
  ]
}

const handleKeyPress = () => {
  console.log('Key pressed')
}

const handleResize = () => {
  console.log('Resize event')
}

onMounted(() => {
  window.addEventListener('keypress', handleKeyPress)
  window.addEventListener('resize', handleResize)
  loadTasks()
  loadUserTasks()
})

onUnmounted(() => {
  window.removeEventListener('keypress', handleKeyPress)
  window.removeEventListener('resize', handleResize)

  // Очистить все таймеры
  Object.values(tasksStore.deletionTimers).forEach(timer => {
    clearInterval(timer.timerId)
  })
  Object.values(userTasksStore.deletionTimers).forEach(timer => {
    clearInterval(timer.timerId)
  })
})
</script>
