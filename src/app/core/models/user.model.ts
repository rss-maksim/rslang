export interface User {
  id?: string;
  username: string;
  email: string;
  image: string;
}

export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}
