import { Routes, Route, Navigate } from "react-router";

import MinimalLayout from './layouts/MinimalLayout';
import AuthLayout from './features/auth/components/AuthLayout';
import Login from './pages/Login';
import { AUTH, LOGIN, REGISTER, CONFIRM_EMAIL, DASHBOARD } from './constants/routes';
import Register from './pages/Register';
import ConfirmEmail from './pages/ConfirmEmail';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';


function AppRoutes() {
  return (
    <Routes>
      <Route element={<MinimalLayout />}>
        <Route path={AUTH} element={<AuthLayout />}>
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={CONFIRM_EMAIL} element={<ConfirmEmail />}/>
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to={LOGIN} replace />}/>
    </Routes>
  );
}

export default AppRoutes;
