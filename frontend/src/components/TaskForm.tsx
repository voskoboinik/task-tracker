import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'
import { useTags } from '../hooks/useTags'

type TaskFormProps = {
  initialValues: TaskDraft
  onSave: (draft: TaskDraft) => void
  onCancel: () => void
}

export function TaskForm(props: TaskFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')

  const { load, retry } = useTags()
  const tags = load.status === 'success' ? load.data : []
  const selectedTagExists = tags.some((tag) => tag.id === draft.tag)
  const canSave = load.status === 'success' && selectedTagExists

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSave) {
      setError('Дождитесь справочника и выберите доступный тег.')
      return
    }

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
      <select id="task-tag" value={draft.tag} required
        disabled={load.status !== 'success' || tags.length === 0}
        onChange={(event) => setDraft({
          ...draft, tag: event.target.value,
        })}>
        <option value="">Выберите тег</option>
        {draft.tag !== '' && !selectedTagExists && (
          <option value={draft.tag} disabled>
            Текущий код: {draft.tag} — выберите доступный тег
          </option>
        )}
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>

      {load.status === 'loading' && (
        <p role="status">Загружаем теги…</p>
      )}
      {load.status === 'error' && (
        <div>
          <p role="alert">{load.message}</p>
          <button type="button" onClick={retry}>Повторить</button>
        </div>
      )}
      {load.status === 'success' && tags.length === 0 && (
        <div>
          <p role="status">Тегов пока нет. Сохранение недоступно.</p>
          <button type="button" onClick={retry}>Повторить</button>
        </div>
      )}
      {load.status === 'success' && tags.length > 0 && (
  <button type="button" onClick={retry}>
    Обновить справочник
  </button>
)}

      {error && <p role="alert" className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="button" disabled={!canSave}>Сохранить</button>
        <button type="button" className="button button-secondary" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}