import { Components } from '../utils/enums';

abstract class Page {
  protected container: HTMLElement;

  protected TextObject = {};

  public constructor(id: string, className: string) {
    this.container = document.createElement(Components.Main);
    this.container.className = className;
    this.container.id = id;
  }

  protected createBlock(className: string): HTMLElement {
    const newBlock = document.createElement(Components.Div);
    newBlock.className = className;
    return newBlock;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page;
