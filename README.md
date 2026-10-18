<<<<<<< HEAD
# TaskFlow - Task Management Web Application

A responsive task manager built with **HTML, CSS, JavaScript and React** (Vite).

## Features
- Create, view, edit and delete tasks
- Task fields: title, description, priority, creation date, due date, completion status
- Search by title
- Sort by deadline, priority, status or newest
- Filter by status, priority and due date
- Dashboard: total, pending, completed and overdue tasks
- Form validation with error messages
- Confirmation before deleting
- Visual indicators for priority (colored border/badge) and deadlines (Overdue / Due soon)
- Data saved in browser Local Storage
- Responsive for desktop, tablet and mobile
- Empty states

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Project structure
```
src/
  main.jsx               entry point
  App.jsx                main component (state + actions)
  components/            Dashboard, Toolbar, TaskList, TaskItem, TaskForm, ConfirmDelete
  hooks/useLocalStorage.js
  utils/helpers.js       date helpers, filter/sort, validation
```

## Deploy
- **Vercel:** import the GitHub repo, framework = Vite, deploy.
- **GitHub Pages:** run `npm run build` and publish the `dist` folder.
=======
# taskflow
>>>>>>> e7fbee56f9db72fdac033bc9f9ad4a65ea08ca62
