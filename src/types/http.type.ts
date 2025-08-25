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

export interface FullResponse<T> {
  status: number;
  message: string;
  path: string;
  errors: string[];
  data: T;
}
