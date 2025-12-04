export interface TaskHistory {
  id: number
  action: 'added' | 'complited' | 'notcomplited' | 'deleted'
  shortTitle: string
  registerAt: Date
}