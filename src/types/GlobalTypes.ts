export type Page = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export interface PageableResponse<T> {
  content: T;
  page: Page;
}
