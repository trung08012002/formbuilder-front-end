import { SuccessResponse } from './utils';

export interface UserInfor {
  email: string;
  username: string;
  avatar: string;
}
export interface AuthResponse
  extends SuccessResponse<{
    access_token: string;
    refresh_token: string;
    user: UserInfor;
  }> {}
