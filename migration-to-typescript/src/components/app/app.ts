import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data } from '../../utils/types';
import IApp from '../../utils/interfaces/IApp';

class App implements IApp {
  readonly controller: AppController;

  readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) => {
      this.controller.getNews(e, (data: Data) => this.view.drawNews(data));
    });
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
