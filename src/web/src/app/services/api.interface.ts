export interface ApiExceptionResponse {
  statusCode: number;
  error: string;
  message: string;
}

export interface IApiState {
  errors: (any|ApiExceptionResponse)[];
}
