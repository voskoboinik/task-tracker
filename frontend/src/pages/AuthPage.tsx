import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router'
import type { AuthState } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

type Mode = 'login' | 'register'

export function AuthPage({ auth }: { auth: AuthState }) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if (auth.status === 'authenticated') {
    return <Navigate to="/tasks" replace />
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError('')
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')
    setMessage('')

    const trimmedEmail = email.trim()
    if (trimmedEmail === '') {
      setError('Введите email.')
      return
    }
    if (mode === 'register' && password.length < 8) {
      setError('Пароль должен содержать не менее 8 символов.')
      return
    }
    if (mode === 'login' && password === '') {
      setError('Введите пароль.')
      return
    }

    setPending(true)
    try {
      if (mode === 'register') {
        const { data, error: authError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: { emailRedirectTo: window.location.origin },
        })
        if (authError) throw authError
        if (!data.session) {
          setMessage('Проверьте почту и подтвердите регистрацию, затем войдите.')
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        })
        if (authError) throw authError
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось выполнить запрос.')
    } finally {
      setPending(false)
    }
  }

  return (
    <section>
      <h1>{mode === 'login' ? 'Вход' : 'Регистрация'}</h1>

      <div className="auth-tabs">
        <button type="button"
          className={`button ${mode === 'login' ? '' : 'button-secondary'}`}
          onClick={() => switchMode('login')}>
          Вход
        </button>
        <button type="button"
          className={`button ${mode === 'register' ? '' : 'button-secondary'}`}
          onClick={() => switchMode('register')}>
          Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="task-form">
        <label htmlFor="auth-email">Email</label>
        <input id="auth-email" type="email" autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="auth-password">Пароль</label>
        <input id="auth-password" type="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p role="alert" className="form-error">{error}</p>}
        {message && <p role="status" className="auth-message">{message}</p>}

        <div className="form-actions">
          <button type="submit" className="button" disabled={pending}>
            {pending
              ? 'Подождите…'
              : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
      </form>
    </section>
  )
}