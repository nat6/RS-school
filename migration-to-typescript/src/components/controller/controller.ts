import AppLoader from './appLoader';
import { Callback, Data } from '../../utils/types';
import { Endpoint } from '../../utils/enums';
import IAppController from '../../utils/interfaces/IAppController';

class AppController extends AppLoader implements IAppController {
  getSources(callback: (data: Data) => void): void {
    super.getResp(
      {
        endpoint: Endpoint.sources,
      },
      callback,
    );
  }

  getNews(e: Event, callback: Callback<Data>): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId as string);
          super.getResp(
            {
              endpoint: Endpoint.everything,
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
