import { useState } from 'react'
import { Link } from 'react-router'
import { TaskCard } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task'

type TasksPageProps = { tasks: Task[] }

export function TasksPage({ tasks }: TasksPageProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all')

  const visibleTasks = tasks.filter(
    (task) => status === 'all' || task.status === status
  )

  return (
    <section>
      <div className="page-header">
        <h1>Мои задачи</h1>
        <Link to="/tasks/new" className="button">Добавить задачу</Link>
      </div>

      <div className="filter-bar">
        <label htmlFor="status-filter">Статус</label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'all' || value === 'todo' || value === 'in_progress' || value === 'done') {
              setStatus(value)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="todo">Запланировано</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
        <button type="button" className="button button-secondary" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-state">Задач пока нет.</p>
      ) : visibleTasks.length === 0 ? (
        <p className="empty-state">По выбранному фильтру ничего не найдено.</p>
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}