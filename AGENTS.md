# AGENTS Instructions

This repository contains a Node.js backend in the `backend/` folder and a React frontend in the `frontend/` folder.

- To run the backend server locally, from `backend/` run:
  ```bash
  npm start
  ```

- To run the frontend development server, from `frontend/` run:
  ```bash
  npm start
  ```

There are no automated tests configured.

- backend:
  - The backend is a Node.js server that serves the frontend and provides an API for the frontend to interact with.
  - The backend uses Express.js and is configured to run on port 3001.
  - The backend uses a specified MariaDB to store data.

- frontend:
  - The frontend is a React application that uses Vite as the build tool.
  - The frontend is configured to run on port 3000.
  - The frontend uses Axios + react query and userHook style to make API calls to the backend.
  - The frontend uses React Query for data fetching and caching.
  - The frontend uses React Hook Form for form handling.
  - The frontend uses Yup for form validation.
  - The frontend uses React Icons for icons.
  - The frontend uses React Toastify for notifications.
  - The frontend uses React Query Devtools for debugging.
  - The frontend uses React Router DOM for routing.
  - The frontend uses React Router DOM for navigation.
  - The frontend uses Tailwind CSS for styling.
  - The frontend uses Zustand for state management.

