import type { Task } from '../types/task'

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Подготовить план проекта',
    description: 'Описать основной сценарий приложения.',
    status: 'todo',
    dueDate: '2026-10-01',
    priority: 'high',
    tag: 'Учёба',
  },
  {
    id: 't2',
    title: 'Сделать вёрстку списка задач',
    description: 'Собрать карточки задач и страницу списка.',
    status: 'in_progress',
    dueDate: '2026-10-05',
    priority: 'medium',
    tag: 'Разработка',
  },
  {
    id: 't3',
    title: 'Проверить типы TypeScript',
    description: 'Убедиться, что сборка проходит без ошибок типов.',
    status: 'done',
    dueDate: '2026-09-28',
    priority: 'low',
    tag: 'Разработка',
  },
  {
    id: 't4',
    title: 'Подготовить презентацию к защите',
    description: 'Собрать слайды с демонстрацией приложения.',
    status: 'todo',
    dueDate: '2026-10-10',
    priority: 'high',
    tag: 'Учёба',
  },
  {
    id: 't5',
    title: 'Изучить React Router',
    description: 'Разобраться с маршрутами и параметрами URL.',
    status: 'in_progress',
    dueDate: '2026-10-03',
    priority: 'medium',
    tag: 'Учёба',
  },
]