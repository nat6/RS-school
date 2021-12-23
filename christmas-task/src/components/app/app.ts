import IApp from '../../utils/interfaces/IApp';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Data from '../../data';

class App implements IApp {
  readonly controller: AppController;

  readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    document.addEventListener('DOMContentLoaded', () => this.controller.loadCards(Data));

    const nav = document.querySelector('.nav__list');
    nav?.addEventListener('click', (e) => this.controller.loadPage(e));

    const start = document.querySelector('#start');
    start?.addEventListener('click', (e) => this.controller.loadPage(e));

    const toysItems = document.querySelector('.toys__items');
    toysItems?.addEventListener('click', (e) => this.controller.changeSelected(e));

    const filters = document.querySelector('.filters');
    filters?.addEventListener('click', (e) => this.controller.updateCards(e));

    const sort = document.querySelector('#sort') as HTMLSelectElement;
    sort.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.controller.sortCards(target.value);
    });
  }
}

export default App;
