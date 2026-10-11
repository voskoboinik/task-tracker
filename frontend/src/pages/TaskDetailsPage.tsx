import { Link, useNavigate, useParams } from 'react-router'
import type { Task } from '../types/task'

type TaskDetailsPageProps = {
  tasks: Task[]
  onDelete: (id: string) => void
}

const statusLabels: Record<string, string> = {
  todo: 'Не начато',
  in_progress: 'В процессе',
  done: 'Готово',
}

const priorityLabels: Record<string, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}

export function TaskDetailsPage({ tasks, onDelete }: TaskDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section>
        <h1>Задача не найдена</h1>
        <p>Задачи с таким адресом не существует.</p>
        <Link to="/tasks" className="button">К списку задач</Link>
      </section>
    )
  }

  return (
    <section className="task-details">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <dl>
        <dt>Срок</dt>
        <dd>{task.dueDate}</dd>
        <dt>Статус</dt>
        <dd>{statusLabels[task.status]}</dd>
        <dt>Приоритет</dt>
        <dd>{priorityLabels[task.priority]}</dd>
        <dt>Тег</dt>
        <dd>{task.tag}</dd>
      </dl>
      <div className="form-actions">
        <Link to="/tasks" className="button">К списку задач</Link>
        <Link to={`/tasks/${task.id}/edit`} className="button button-secondary">
          Редактировать
        </Link>
        <button
          type="button"
          className="button button-danger"
          onClick={() => {
            if (window.confirm(`Удалить задачу «${task.title}»?`)) {
              onDelete(task.id)
              navigate('/tasks', { replace: true })
            }
          }}
        >
          Удалить
        </button>
      </div>
    </section>
  )
}