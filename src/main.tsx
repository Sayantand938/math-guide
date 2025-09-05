import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import ChapterListPage from './pages/ChapterListPage.tsx';
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
        path: 'book/:bookId',
        element: <ChapterListPage />,
      },
      {
        path: 'book/:bookId/chapter/:chapterId',
        element: <ChapterIndexPage />,
      },
      {
        path: 'book/:bookId/chapter/:chapterId/:exerciseId',
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