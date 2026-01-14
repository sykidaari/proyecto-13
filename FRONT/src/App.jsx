import R from '@/constants/client/routePaths.js';
import Notifications from '@/pages/auth/Notifications/Notifications.jsx';
import Profile from '@/pages/auth/Profile/Profile.jsx';
import Sessions from '@/pages/auth/Sessions/Sessions.jsx';
import Settings from '@/pages/auth/Settings/Settings.jsx';
import Feature from '@/pages/public/Feature/Feature.jsx';
import Landing from '@/pages/public/Landing/Landing.jsx';
import AuthRoute from '@/routes/AuthRoute.jsx';
import NotFound from '@/routes/NotFound.jsx';
import PublicRoute from '@/routes/PublicRoute.jsx';
import AuthLayout from '@c/layouts/AuthLayout/AuthLayout.jsx';
import PublicLayout from '@c/layouts/PublicLayout/PublicLayout.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div id='app' className='bg-base-100 min-h-dvh '>
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
          path='/app'
          element={
            <AuthRoute>
              <AuthLayout />
            </AuthRoute>
          }
        >
          <Route path={R.auth.discover.rel} element={<Landing />} />
          <Route path={R.auth.profile.rel} element={<Profile />} />
          <Route path={R.auth.notifications.rel} element={<Notifications />} />
          <Route path={R.auth.sessions.rel} element={<Sessions />} />
          <Route path={R.auth.settings.rel} element={<Settings />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
