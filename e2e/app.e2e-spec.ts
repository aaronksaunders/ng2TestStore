import { TestStorePage } from './app.po';

describe('test-store App', function() {
  let page: TestStorePage;

  beforeEach(() => {
    page = new TestStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
