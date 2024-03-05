import { SuccessResponse } from './utils';

export interface UserAuth {
  username: string;
  userId: string;
  email: string;
}

export interface AuthResponse
  extends SuccessResponse<{
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: UserAuth;
  }> {}

export interface Profile {
  userId: string;
  email: string;
  password: string;
  avatar: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
