# To-Do List (React + Vite)

A minimal, clean To-Do app built with React. Supports adding, completing (toggle), deleting tasks, and localStorage persistence.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build && npm run preview
```

## Structure

- `src/App.jsx`: Main app component
- `src/main.jsx`: Entry and mount
- `src/styles.css`: Minimal styling
- `index.html`: Root document

## Notes

- Tasks are stored in `localStorage` under the key `tasks`.
- Each task has shape `{ id, text, completed }`.