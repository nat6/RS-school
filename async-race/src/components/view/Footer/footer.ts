import Component from '../../../templates/component';

class Footer extends Component {
  public constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  protected createHTML(): void {
    const footerHTML = `
      <div class="container footer__container">
        <a class="footer__link" href="https://github.com/nat6" target="_blank"> ☮ nat6 </a>
      </div>
    `;

    this.container.innerHTML = footerHTML;
  }

  public render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Footer;
