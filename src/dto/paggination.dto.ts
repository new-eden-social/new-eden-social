export class DPagination {
  data: any[];
  page: number;
  pages: number;
  perPage: number;
  count: number;

  constructor(data: any[], page: number, perPage: number, count: number) {
    this.data = data;
    this.page = page;
    this.perPage = perPage;
    this.count = count;
    this.pages = Math.ceil(count / perPage);
  }
}
