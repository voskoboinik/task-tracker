import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">Task Tracker</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/tasks" end>Задачи</NavLink>
          <NavLink to="/tasks/new">Создать</NavLink>
        </nav>
      </header>
      <p className="data-notice">
        Изменения хранятся только в памяти этой вкладки. После обновления
        страницы вернутся демонстрационные данные.
      </p>
      <main>
        <Outlet />
      </main>
    </div>
  )
}