import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <h1>Страница не найдена</h1>
      <p>Такого адреса не существует.</p>
      <Link to="/tasks" className="button">К списку задач</Link>
    </section>
  )
}