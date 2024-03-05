import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { PATH } from '@/constants/route';
import { LoginPage } from '@/pages/LoginPage';
import { MyFormPage } from '@/pages/MyFormPage';
import { RegisterPage } from '@/pages/RegisterPage';

// route required authentication to navigate to
export function ProtectedRoute() {
  const isAuthenticated = Boolean();

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN_PAGE} />;
}

// route for page like login and register when not authenticated to navigate
export function RejectedRoute() {
  const isAuthenticated = Boolean();

  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.MY_FORM_PAGE} />;
}

export function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: PATH.ORIGINAL_PAGE,
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.ORIGINAL_PAGE,
          element: <LoginPage />,
        },
        {
          path: PATH.LOGIN_PAGE,
          element: <LoginPage />,
        },
        {
          path: PATH.REGISTER_PAGE,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: PATH.ORIGINAL_PAGE,
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.MY_FORM_PAGE,
          element: <MyFormPage />,
        },
      ],
    },
  ]);
  return routeElements;
}
