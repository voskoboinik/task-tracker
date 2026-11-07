import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import type { AuthState } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export function AppLayout({ auth }: { auth: AuthState }) {
  const [signOutError, setSignOutError] = useState('')

  async function handleSignOut() {
    setSignOutError('')
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) setSignOutError(error.message)
  }

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">Task Tracker</p>
        <nav aria-label="Основная навигация">
          {auth.status === 'authenticated' ? (
            <>
              <NavLink to="/tasks" end>Задачи</NavLink>
              <NavLink to="/tasks/new">Создать</NavLink>
            </>
          ) : (
            <NavLink to="/auth">Вход</NavLink>
          )}
        </nav>
      </header>
      {auth.status === 'authenticated' && (
        <div className="user-bar">
          <span>{auth.session.user.email}</span>
          <button type="button" className="button button-secondary"
            onClick={handleSignOut}>
            Выйти
          </button>
        </div>
      )}
      {signOutError && (
        <p role="alert" className="form-error">{signOutError}</p>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  )
}