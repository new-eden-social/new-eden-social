export class DPagination<T> {
  data: T[];
  page: number;
  pages: number;
  perPage: number;
  count: number;

  constructor(data: T[], page: number, perPage: number, count: number) {
    this.data = data;
    this.page = page;
    this.perPage = perPage;
    this.count = count;
    this.pages = Math.ceil(count / perPage);
  }
}
