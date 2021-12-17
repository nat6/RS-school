import { Callback, Data } from '../types';

interface IAppController {
  getSources(callback: (data: Data) => void): void;
  getNews(e: Event, callback: Callback<Data>): void;
}

export default IAppController;
