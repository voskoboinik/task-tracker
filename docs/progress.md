# Прогресс

## Лабораторная 1
- Создан проект React + TypeScript + Vite (frontend)
- Заменён стартовый экран на собственный (Task Tracker)
- Проверка типов и сборка проходят успешно
- Репозиторий опубликован на GitHub

## Шаги проверки
1. cd frontend, затем npm ci
2. npm run dev, открыть http://localhost:5173
3. Увидеть заголовок Task Tracker и раздел "Мои задачи"
4. npm run build, сборка проходит без ошибок
5. npm run preview, открыть адрес и проверить экран

Коммит: см. git log -1 --oneline

## Лабораторная 2
- Добавлены типы Task и 5 демонстрационных записей
- Создан компонент TaskCard, страницы TasksPage, TaskDetailsPage,
  NewTaskPage, NotFoundPage
- Подключён react-router: BrowserRouter, Routes, Outlet, useParams
- Общий layout AppLayout с навигацией
- Проверены переходы, прямое открытие карточки, пустой список,
  неизвестный путь и отсутствующая запись

Шаги проверки:
1. npm run dev, открыть /, /tasks, /tasks/t1 и /tasks/t2
2. Прямое открытие /tasks/t3 в новой вкладке и обновление страницы
3. Переход на /tasks/new, видна заглушка
4. Открыть /unknown и /tasks/missing — разные сообщения
5. npm run build, npm run preview — проверить сборку

Коммит: см. git log -1 --oneline