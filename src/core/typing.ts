export interface IRequestOptions {
  method: string;
  path: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  isAuth?: boolean;
}
