import IOptions from './IOptions';
import { Callback, Data } from '../types';

interface ILoader {
  baseLink: string;
  options: IOptions;

  getResp({ endpoint, options }: { endpoint: string; options: IOptions }, callback: Callback<Data>): void;
  errorHandler<T extends Response>(res: T): T | never;
  makeUrl(options: IOptions, endpoint: string): string;
  load(method: string, endpoint: string, callback: (data: Data) => void, options: IOptions): void;
}

export default ILoader;
