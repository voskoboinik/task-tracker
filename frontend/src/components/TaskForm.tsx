import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'

type TaskFormProps = {
  initialValues: TaskDraft
  onSave: (draft: TaskDraft) => void
  onCancel: () => void
}

export function TaskForm(props: TaskFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = draft.title.trim()
    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }
    if (!draft.dueDate) {
      setError('Укажите срок задачи.')
      return
    }
    if (draft.status === 'done' && draft.description.trim().length === 0) {
      setError('Для завершённой задачи укажите описание результата.')
      return
    }

    setError('')
    props.onSave({ ...draft, title })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="task-form">
      <label htmlFor="task-title">Название</label>
      <input
        id="task-title"
        value={draft.title}
        required
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
      />

      <label htmlFor="task-description">Описание</label>
      <textarea
        id="task-description"
        value={draft.description}
        onChange={(e) => setDraft({ ...draft, description: e.target.value })}
      />

      <label htmlFor="task-date">Срок</label>
      <input
        id="task-date"
        type="date"
        value={draft.dueDate}
        required
        onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
      />

      <label htmlFor="task-status">Статус</label>
      <select
        id="task-status"
        value={draft.status}
        onChange={(e) => {
          const status = e.target.value
          if (status === 'todo' || status === 'in_progress' || status === 'done') {
            setDraft({ ...draft, status })
          }
        }}
      >
        <option value="todo">Запланировано</option>
        <option value="in_progress">В работе</option>
        <option value="done">Готово</option>
      </select>

      <label htmlFor="task-priority">Приоритет</label>
      <select
        id="task-priority"
        value={draft.priority}
        onChange={(e) => {
          const priority = e.target.value
          if (priority === 'low' || priority === 'medium' || priority === 'high') {
            setDraft({ ...draft, priority })
          }
        }}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <label htmlFor="task-tag">Тег</label>
      <input
        id="task-tag"
        value={draft.tag}
        onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
      />

      {error && <p role="alert" className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="button">Сохранить</button>
        <button type="button" className="button button-secondary" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}