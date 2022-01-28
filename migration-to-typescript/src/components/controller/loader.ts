import ILoader from '../../utils/interfaces/ILoader';
import IOptions from '../../utils/interfaces/IOptions';
import { Data, Callback, Options } from '../../utils/types';

class Loader implements ILoader {
  readonly baseLink: string;

  readonly options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options }: { endpoint: string; options?: Options },
    callback: Callback<Data> = () => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler<T extends Response>(res: T): T | never {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: IOptions, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });
    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: Callback<Data>, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: Data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
