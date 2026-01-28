import R from '@/constants/client/routePaths.js';
import Notifications from '@/pages/auth/Notifications/Notifications.jsx';
import Profile from '@/pages/auth/Profile/Profile.jsx';
import Sessions from '@/pages/auth/Sessions/Sessions.jsx';
import Settings from '@/pages/auth/Settings/Settings.jsx';
import Feature from '@/pages/public/Feature/Feature.jsx';
import Landing from '@/pages/public/Landing/Landing.jsx';
import NotFound from '@/routes/NotFound.jsx';
import PublicRoute from '@/routes/PublicRoute.jsx';
import PublicLayout from '@c/layouts/PublicLayout/PublicLayout.jsx';
import { Route, Routes } from 'react-router-dom';
import PrivateLayout from '@c/layouts/PrivateLayout/PrivateLayout.jsx';
import PrivateRoute from '@/routes/PrivateRoute.jsx';
import AuthLayout from '@c/layouts/AuthLayout/AuthLayout.jsx';
import Login from '@/pages/public/Login/Login.jsx';
import Register from '@/pages/public/Register/Register.jsx';
import useIsInitializing from '@/contexts/UserSession/hooks/useInitializing.js';

function App() {
  const isInitializing = useIsInitializing();

  if (isInitializing)
    return (
      <div className='w-full h-dvh flex items-center justify-center bg-base-100'>
        <span className='loading loading-xl text-base-content' />
      </div>
    );

  return (
    <div id='app' className='bg-base-100'>
      <Routes>
        <Route
          path='/'
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          <Route index element={<Landing />} />
          <Route path={R.public.feature.rel} element={<Feature />} />
        </Route>

        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path={R.auth.login.rel} element={<Login />} />
          <Route path={R.auth.register.rel} element={<Register />} />
        </Route>

        <Route
          path='/app'
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path={R.private.discover.rel} element={<Landing />} />
          <Route path={R.private.profile.rel} element={<Profile />} />
          <Route
            path={R.private.notifications.rel}
            element={<Notifications />}
          />
          <Route path={R.private.sessions.rel} element={<Sessions />} />
          <Route path={R.private.settings.rel} element={<Settings />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
