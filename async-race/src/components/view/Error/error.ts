import Page from '../../../templates/page';
import { Components, ClassNames } from '../../../utils/enums';

class ErrorPage extends Page {
  protected TextObject = {
    ErrorText: 'Oops! The page was not found! :(',
  };

  constructor(id: string) {
    super(id, Components.Main);
  }

  protected createHTML(): void {
    const mainContainer = this.createBlock(`${ClassNames.Container} ${ClassNames.MainContainer}`);

    const errorHTML = `
      <div class="error"> ${this.TextObject.ErrorText} </div>
    `;

    mainContainer.innerHTML = errorHTML;
    this.container.append(mainContainer);
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default ErrorPage;
