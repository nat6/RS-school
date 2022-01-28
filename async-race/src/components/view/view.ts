import Page from '../../templates/page';
import Header from './Header/header';
import Footer from './Footer/footer';

import Garage from './Garage/garage';
import Winners from './Winners/winners';
import ErrorPage from './Error/error';

import { PageIds, Components } from '../../utils/enums';
import { CarType, NewWinnerType } from '../../utils/types';

class AppView {
  private readonly container: HTMLElement = document.body;

  private readonly header: Header;

  private readonly footer: Footer;

  constructor() {
    this.header = new Header(Components.Header, Components.Header);
    this.footer = new Footer(Components.Footer, Components.Footer);
  }

  private renderNewPage(
    idPage: string,
    count: string,
    pageNum: number,
    cars: Array<CarType>,
    winners: Array<NewWinnerType>,
  ): void {
    const currentHTML = document.querySelector(`#${PageIds.DefaultId}`);

    if (currentHTML) {
      currentHTML.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GaragePage) {
      const currentCars = cars || [];
      page = new Garage(idPage, count, pageNum, currentCars);
    } else if (idPage === PageIds.WinnersPage) {
      const currentWinners = winners || [];
      page = new Winners(idPage, count, pageNum, currentWinners);
    } else {
      page = new ErrorPage(idPage);
    }

    if (page) {
      const newHTML = page.render();
      newHTML.id = PageIds.DefaultId;
      this.container.append(newHTML);
    }
  }

  async render(
    idPage: string,
    count: string,
    pageNum: number,
    cars: Array<CarType>,
    winners: Array<NewWinnerType>,
  ): Promise<void> {
    this.container.append(this.header.render());
    this.renderNewPage(idPage, count, pageNum, cars, winners);
    this.container.append(this.footer.render());
  }
}

export default AppView;
