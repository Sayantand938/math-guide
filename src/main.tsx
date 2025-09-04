import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import ChapterIndexPage from './pages/ChapterIndexPage.tsx';
import ExercisePage from './pages/ExercisePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'chapter/:chapterId',
        element: <ChapterIndexPage />,
      },
      {
        path: 'chapter/:chapterId/:exerciseId',
        element: <ExercisePage />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)