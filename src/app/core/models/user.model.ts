export interface User {
  id?: string;
  username: string;
  email: string;
  pictureUrl: string;
}

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}
