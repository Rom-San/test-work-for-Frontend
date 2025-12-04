import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Task } from '@/types/Task'
import type { TaskHistory } from '@/types/TaskHistory'
import type { DeletionTimer } from '@/types/DeletionTimer'

const DELETION_TIMEOUT = 10

export const useUserTasksStore = defineStore('userTasks', () => {

  const tasks = ref<Task[]>([])
  const history = ref<TaskHistory[]>([])
  const pendingDeletions = ref<Set<number>>(new Set())
  const deletionTimers = ref<Record<number, DeletionTimer>>({})
  const currentFilter = ref<'all' | 'active' | 'completed'>('all')
  const addError = ref<string>('')

  const allTasks = computed(() => tasks.value.length)
  const activeTasks = computed(() => tasks.value.filter(t => !t.completed).length)
  const completedTasks = computed(() => tasks.value.filter(t => t.completed).length)

  const getCompletionPercentage = computed(() => {
    if (tasks.value.length === 0) return 0
    const completed = tasks.value.filter(t => t.completed).length
    return (completed / tasks.value.length * 100).toFixed(1)
  })

  const filteredTasks = () => {
    switch (currentFilter.value) {
      case 'active':
        return tasks.value.filter(t => !t.completed)
      case 'completed':
        return tasks.value.filter(t => t.completed)
      default:
        return tasks.value
    }
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      task.updatedAt = new Date()
      task.completedAt = task.completed ? new Date() : null
      updateHistory(task, task.completed ? 'complited' : 'notcomplited')
    }
  }

  let lastAddTime = 0
  const ADD_COOLDOWN = 1000

  const addTask = (newTaskTitle: string) => {

    const now = Date.now()
    if (now - lastAddTime < ADD_COOLDOWN) {
      addError.value = 'Подождите перед добавлением новой задачи'
      return
    }

    addError.value = ''
    lastAddTime = now

    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null
    }

    tasks.value.push(newTask)
    updateHistory(newTask, 'added')
  }

  const startDeletion = (id: number) => {
    pendingDeletions.value.add(id)

    const timerId = window.setInterval(() => {
      if (deletionTimers.value[id]) {
        deletionTimers.value[id].timeLeft--

        if (deletionTimers.value[id].timeLeft <= 0) {
          const task = tasks.value.find(t => t.id === id)
          if (task) {
            updateHistory(task, 'deleted')
          }

          tasks.value = tasks.value.filter(t => t.id !== id)
          pendingDeletions.value.delete(id)

          const timer = deletionTimers.value[id]
          if (timer) {
            clearInterval(timer.timerId)
            delete deletionTimers.value[id]
          }
        }
      }
    }, 1000)

    deletionTimers.value[id] = {
      timerId,
      timeLeft: DELETION_TIMEOUT
    }
  }

  const cancelDeletion = (id: number) => {
    const timer = deletionTimers.value[id]
    if (timer) {
      clearInterval(timer.timerId)
      delete deletionTimers.value[id]
    }
    pendingDeletions.value.delete(id)
  }

  const updateHistory = (task: Task, action: TaskHistory['action']) => {
    const taskHistory: TaskHistory = {
      id: task.id,
      action,
      shortTitle: task.title.slice(0, 42) + '...',
      registerAt: new Date(),
    }
    history.value.push(taskHistory)
  }

  return {
    tasks,
    history,
    pendingDeletions,
    deletionTimers,
    filteredTasks,
    currentFilter,
    getCompletionPercentage,
    allTasks,
    activeTasks,
    completedTasks,
    toggleTask,
    addTask,
    startDeletion,
    cancelDeletion
  }
},
  {
    persist: {
      pick: ['tasks', 'history']
    },
  }
)