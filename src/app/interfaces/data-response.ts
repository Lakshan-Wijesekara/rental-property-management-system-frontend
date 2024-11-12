export interface PaginateResponse<T> {
  status: string;
  message: string;
  data: T[]; //Always an array
}
export interface DataResponse<T> {
  status: string;
  message: string;
  data: T; //Object
}
