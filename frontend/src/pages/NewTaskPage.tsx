import { Link } from 'react-router'

export function NewTaskPage() {
  return (
    <section>
      <h1>Создание задачи</h1>
      <p>Форма добавления задачи появится в следующей лабораторной работе.</p>
      <Link to="/tasks" className="button">К списку задач</Link>
    </section>
  )
}