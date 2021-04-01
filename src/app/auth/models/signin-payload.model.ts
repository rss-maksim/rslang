export interface SigninPayloadModel {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface SignupRequestPayloadModel {
  email: string;
  password: string;
  username: string;
  image: string;
}
