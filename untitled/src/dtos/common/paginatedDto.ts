export interface PaginatedDto<T> {
  total: number;
  items: T[];
}