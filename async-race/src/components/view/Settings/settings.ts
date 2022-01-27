import Component from '../../../templates/component';

import {
  ButtonsClasses, ButtonsIds, InputsIds, DefaultValues,
} from '../../../utils/enums';

class Settings extends Component {
  public constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  protected createHTML(): void {
    const settingsHTML = `
      <div class="settings__row">
        <input type="text" class="input_text" id=${InputsIds.Name} />
        <input type="color" class="input_color" id=${InputsIds.Color} value=${DefaultValues.Color} />
        <button class="button button_color" id=${ButtonsIds.Create}>create</button>
      </div>
      <div class="settings__row">
        <input type="text" class="input_text" id=${InputsIds.NewName} disabled />
        <input type="color" class="input_color" id=${InputsIds.NewColor} value=${DefaultValues.Color} disabled />
        <button class="button button_color ${ButtonsClasses.ButtonDisabled}" id=${ButtonsIds.Update}>update</button>
      </div>
      <div class="settings__row">
        <button class="button" id=${ButtonsIds.Race}>race</button>
        <button class="button ${ButtonsClasses.ButtonDisabled}" id=${ButtonsIds.Reset}>reset</button>
        <button class="button button_color" id=${ButtonsIds.Generate}>generate car</button>
      </div>
    `;

    this.container.innerHTML = settingsHTML;
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Settings;
