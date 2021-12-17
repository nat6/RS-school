import { Callback } from '../types';

interface IAppController {
  getSources(callback: Callback): void;
  getNews(e: Event, callback: Callback): void;
}

export default IAppController;
