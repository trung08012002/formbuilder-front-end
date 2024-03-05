import { UserInfor } from '@/types/user';

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
  localStorage.removeItem('refresh_token');
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ?? '';

export const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

export const getRefreshTokenFromLS = () =>
  localStorage.getItem('refresh_token') ?? '';

export const saveRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refresh_token', refreshToken);
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};

export const saveProfileToLS = (profile: UserInfor) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
