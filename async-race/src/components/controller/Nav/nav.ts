import { PageIds } from '../../../utils/enums';

class Nav {
  handler: CallableFunction;

  constructor(handler: CallableFunction) {
    this.handler = handler;
    this.start();
  }

  getHash(): string {
    const defaultHash = PageIds.GaragePage;
    const hash = window.location.hash.slice(1);
    return hash || defaultHash;
  }

  private loadPage(handler: CallableFunction): void {
    window.addEventListener('load', () => {
      const hash = this.getHash();
      handler(hash);
    });
  }

  private enableRouteChange(handler: CallableFunction): void {
    window.addEventListener('hashchange', () => {
      const hash = this.getHash();
      handler(hash);
    });
  }

  start(): void {
    this.loadPage(this.handler);
    this.enableRouteChange(this.handler);
  }
}

export default Nav;
