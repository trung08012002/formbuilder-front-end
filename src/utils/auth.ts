import { Profile } from '../types/auth'

export const localStorageEventTarget = new EventTarget()

export const setToLS = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const setAccessTokenToLS = (access_token: string) => {
  setToLS('access_token', access_token)
}
export const setRefreshTokenToLS = (refresh_token: string) => {
  setToLS('refresh_token', refresh_token)
}

export const setUserIDToLS = (user_id: string) => {
  setToLS('user_id', user_id)
}

export const setUserProfileToLS = (profile: Partial<Profile>) => {
  setToLS('profile', profile)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('user_id')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}
export const getFromLS = (key: string) => {
  return localStorage.getItem(key) || ''
}
export const getAccessTokenFromLS = getFromLS('access_token')

export const getRefreshTokenFromLS = getFromLS('refresh_token')

export const getUserIDFromLS = getFromLS('user_id')

export const getUserProfileFromLS = () => {
  const result = getFromLS('profile')
  return result ? JSON.parse(result) : null
}
