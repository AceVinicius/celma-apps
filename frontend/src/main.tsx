import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import AppsCreate from './routes/apps-create';
import AppsEdit from './routes/apps-edit';
import AppsList from './routes/apps-list';
import ErrorPage from "./components/error-page";
import 'antd/dist/reset.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AppsList />,
      },
      {
        path: "apps/create",
        element: <AppsCreate />,
      },
      {
        path: "apps/:id/edit",
        element: <AppsEdit />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
