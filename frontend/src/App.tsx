import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import type { Task, TaskDraft } from './types/task'
import { useAuth } from './hooks/useAuth'
import * as tasksService from './services/tasks'
import { RequireAuth } from './components/RequireAuth'
import { TasksGate } from './components/TasksGate'
import { AppLayout } from './app/AppLayout'
import { AuthPage } from './pages/AuthPage'
import { TasksPage } from './pages/TasksPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
import { NewTaskPage } from './pages/NewTaskPage'
import { EditTaskPage } from './pages/EditTaskPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

type TaskStore = { userId: string; tasks: Task[] }

export default function App() {
  const auth = useAuth()
  const [store, setStore] = useState<TaskStore | null>(null)
  const [loadError, setLoadError] = useState('')
  const [attempt, setAttempt] = useState(0)

  const userId = auth.status === 'authenticated' ? auth.session.user.id : null
  const loaded = store !== null && store.userId === userId
  const tasks: Task[] = loaded ? store.tasks : []

  useEffect(() => {
    if (userId === null) {
      setStore(null)
      setLoadError('')
      return
    }
    let active = true
    setLoadError('')
    tasksService.getTasks()
      .then((data) => {
        if (active) setStore({ userId, tasks: data })
      })
      .catch((error: unknown) => {
        if (!active) return
        setLoadError(error instanceof Error
          ? error.message : 'Не удалось загрузить задачи.')
      })
    return () => {
      active = false
    }
  }, [userId, attempt])

  async function refreshTasks(): Promise<void> {
    if (userId === null) return
    const data = await tasksService.getTasks()
    setStore({ userId, tasks: data })
  }

  async function createTask(draft: TaskDraft): Promise<string> {
    const created = await tasksService.createTask(draft)
    await refreshTasks()
    return created.id
  }

  async function updateTask(id: string, draft: TaskDraft): Promise<void> {
    await tasksService.updateTask(id, draft)
    await refreshTasks()
  }

  async function deleteTask(id: string): Promise<void> {
    await tasksService.deleteTask(id)
    await refreshTasks()
  }

  return (
    <Routes>
      <Route element={<AppLayout auth={auth} />}>
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="auth" element={<AuthPage auth={auth} />} />
        <Route element={<RequireAuth auth={auth} />}>
          <Route element={
            <TasksGate loaded={loaded} error={loadError}
              onRetry={() => setAttempt((current) => current + 1)} />
          }>
            <Route path="tasks" element={<TasksPage tasks={tasks} />} />
            <Route path="tasks/new"
              element={<NewTaskPage onCreate={createTask} />} />
            <Route path="tasks/:id" element={
              <TaskDetailsPage tasks={tasks} onDelete={deleteTask} />
            } />
            <Route path="tasks/:id/edit" element={
              <EditTaskPage tasks={tasks} onUpdate={updateTask} />
            } />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}