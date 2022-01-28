import { Components } from '../utils/enums';

abstract class Component {
  protected container: HTMLElement;

  protected TextObject = {};

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  protected createHTML(): void {}

  protected createBlock(className: string): HTMLElement {
    const newBlock = document.createElement(Components.Div);
    newBlock.className = className;
    return newBlock;
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Component;
