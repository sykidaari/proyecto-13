import backend from '@/api/config/axios.js';
import { IS_DEV } from '@/utils/env.js';
import { retry } from '@/utils/helpers.js';

const syncAppStateFromBackend = async (user, appActions, appState) => {
  appActions.setLanguage(user.languageCode);
  appActions.setCountry(user.countryCode);

  const route = `/user/${user._id}/private/appSettings`;

  try {
    const { appSettings: accountAppSettings } = await retry(
      () => backend.get(route),
      2
    );

    if (!accountAppSettings.syncedAcrossDevices) return;

    if (!accountAppSettings.settings.theme) {
      await retry(
        () =>
          backend.patch(route, {
            settings: { theme: appState.theme }
          }),
        2
      );

      return;
    }

    appActions.setAppTheme(accountAppSettings.theme);
  } catch (error) {
    IS_DEV && console.log(error);
  }
};

export default syncAppStateFromBackend;
