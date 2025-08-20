export interface BaseResponse {
  status: number;
  message: string;
}

export interface ErrorResponse extends BaseResponse {
  path: string;
  errors: string[];
}

export interface DataResponse<T> extends BaseResponse {
  data: T;
}
