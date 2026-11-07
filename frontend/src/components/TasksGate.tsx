import { Outlet } from 'react-router'

type TasksGateProps = {
  loaded: boolean
  error: string
  onRetry: () => void
}

export function TasksGate({ loaded, error, onRetry }: TasksGateProps) {
  if (!loaded) {
    if (error) {
      return (
        <section>
          <p role="alert" className="form-error">{error}</p>
          <button type="button" className="button" onClick={onRetry}>
            Повторить
          </button>
        </section>
      )
    }
    return <p role="status">Загружаем задачи…</p>
  }
  return <Outlet />
}