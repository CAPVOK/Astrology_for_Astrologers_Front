export interface IRequestOptions {
  method: string;
  path: string;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  params?: Record<string, string>;
  isAuth?: boolean;
}
