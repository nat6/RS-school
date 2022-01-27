import Component from '../../../templates/component';

class Header extends Component {
  public constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  protected createHTML(): void {
    const headerHTML = `
      <div class="container header__container">
        <nav class="nav">
          <ul class="nav__list">
            <li>
              <a href="#garage" class="button button_nav" id="garage"> to garage </a>
            </li>
            <li>
              <a href="#winners" class="button button_nav" id="winners"> to winners </a>
            </li>
          </ul>
        </nav>
      </div>
    `;

    this.container.innerHTML = headerHTML;
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Header;
