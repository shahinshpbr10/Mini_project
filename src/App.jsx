import React, { useEffect, useMemo, useState } from 'react'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [newTaskText, setNewTaskText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch {
      // ignore write errors
    }
  }, [tasks])

  const remainingCount = useMemo(() => tasks.filter(t => !t.completed).length, [tasks])

  function addTask(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask = { id: generateId(), text: trimmed, completed: false }
    setTasks(prev => [...prev, newTask])
    setNewTaskText('')
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addTask(newTaskText)
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">To‑Do List</h1>
        <p className="subtle">
          {tasks.length === 0 ? 'No tasks yet' : `${remainingCount} remaining / ${tasks.length} total`}
        </p>
      </header>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          aria-label="Task description"
        />
        <button className="add-btn" type="submit" disabled={!newTaskText.trim()}>
          Add
        </button>
      </form>

      <ul className="task-list" aria-live="polite">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <label className="task">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                aria-label={task.completed ? 'Mark as not completed' : 'Mark as completed'}
              />
              <span className={task.completed ? 'task-text completed' : 'task-text'}>{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task.id)} aria-label="Delete task">
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}