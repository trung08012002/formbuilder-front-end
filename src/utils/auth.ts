import i18next from 'i18next';

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('lng');
  localStorage.removeItem('i18nextLng');
  sessionStorage.removeItem('i18nextLng');
  i18next.changeLanguage('en');
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ?? '';

export const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};
