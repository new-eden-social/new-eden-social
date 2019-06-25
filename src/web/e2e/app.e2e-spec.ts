import { EveBookWebPage } from './app.po';

describe('eve-book-web App', () => {
  let page: EveBookWebPage;

  beforeEach(() => {
    page = new EveBookWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
  });
});
