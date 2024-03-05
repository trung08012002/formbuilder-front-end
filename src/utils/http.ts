import axios, { AxiosInstance } from 'axios';

import { getAccessTokenFromLS, getRefreshTokenFromLS } from './auth';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();

    this.instance = axios.create({
      baseURL: process.env.BACK_END_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
  setToken(token: string) {
    this.accessToken = token;
  }
}
const http = new Http().instance;

export default http;
